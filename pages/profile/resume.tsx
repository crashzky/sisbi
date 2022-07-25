import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Headline from '../../components/Headline';
import Input from '../../components/Input';
import Paragraph from '../../components/Paragraph';
import Radio from '../../components/Radio';
import Switch from '../../components/Switch';
import MainLayout from '../../layouts/MainLayout';
import { useFormik } from 'formik';
import { useMutation, useQuery } from 'react-query';
import { addSchedulesUser, getSchedules, removeSchedulesUser } from '../../shared/api/schedules';
import { addTypeEmployementUser, getTypeEmployments, removeTypeEmployementUser } from '../../shared/api/type_employments';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getMyProfileUser, putProfileUser } from '../../shared/api/user';
import { EXPERIENCE, TO_EXPERIENCE } from '../../shared/consts/profile';
import SkillsSelectPage from './_skills_select';
import ModalLayout from '../../layouts/ModalLayout';
import ProfileSelectJobModal from '../../modals/ProfileSelectJobModal';
import { getJobCategories } from '../../shared/api/job_categories';
import withCheckAuthLayout from '../../layouts/CheckAuthLayout';
import * as Yup from 'yup';
import { getSuggestions } from '../../shared/api/vacancies_suggestions';
import Select from '../../components/Select';
import { ISelectOption } from '../../components/Select/Select.props';

import CloseIcon from '../../assets/general/close.svg';
import LoaderIcon from '../../assets/loader.svg';

const ResumePage = (): JSX.Element => {
	const router = useRouter();

	const [skills, setSkills] = useState(null);
	const [showSkillsSelect, setShowSkillsSelect] = useState(false);

	const [jobCategory, setJobCategory] = useState(null);
	const [showJobSelect, setShowJobSelect] = useState(false);
	const [suggestion, setSuggestion] = useState<ISelectOption>();
	const [suggestRequest, setSuggestRequest] = useState<string>('');

	const { data } = useQuery('my_profile_user', getMyProfileUser, {
		onSuccess: (value) => {
			formik.setValues({
				minPrice: value.payload.min_salary,
				experience: EXPERIENCE[value.payload.experience],
				employement_type: value.payload.type_employments.map((i) => i.id.toString()),
				schedule: value.payload.schedules.map((i) => i.id.toString()),
				ready_move: value.payload.ready_move ? ['on'] : [],
				ready_mission: value.payload.ready_mission ? ['on'] : [],
			});

			if(value.payload.job_category)
				setJobCategory(value.payload.job_category.id);

			if(!skills)
				setSkills(value.payload.skills.split(' ').filter((i) => i !== ''));

			if(value.payload.previous_job) {
				getSuggestions({ name: value.payload.previous_job })
					.then((res) => {
						if(res.payload.length) {
							if(res.payload[0].name === value.payload.previous_job)
								setSuggestion({ label: res.payload[0].name, value: res.payload[0].name });
							else
								setSuggestion({ label: value.payload.previous_job, value: value.payload.previous_job });
						}
					});
			}
		},
	});

	const jobCategoriesQuery = useQuery('job_categories', getJobCategories, {
		initialData: {
			current_page: 1,
			next_page: null,
			payload: [],
			result_code: 'ok',
			total_entries: 0,
			total_pages: 1,
		},
	});

	const schedulesQuery = useQuery('schedules', getSchedules, {
		initialData: {
			current_page: 1,
			next_page: null,
			payload: [],
			result_code: 'ok',
			total_entries: 0,
			total_pages: 1,
		},
	});

	const typeEmploymentsQuery = useQuery('type_employments', getTypeEmployments, {
		initialData: {
			current_page: 1,
			next_page: null,
			payload: [],
			result_code: 'ok',
			total_entries: 0,
			total_pages: 1,
		},
	});

	const removeSchedulesUserMutation = useMutation(removeSchedulesUser, {
		onSuccess: () => {
			addSchedulesUserMutattion.mutate({
				schedules: formik.values.schedule.map((i) => +i),
			});
		},
	});
	const addSchedulesUserMutattion = useMutation(addSchedulesUser, {
		onSuccess: () => {
			removeTypeEmployementUserMutation.mutate({
				type_employments: data.payload.type_employments.map((i) => i.id),
			});
		},
	});
	const removeTypeEmployementUserMutation = useMutation(removeTypeEmployementUser, {
		onSuccess: () => {
			addTypeEmployementUserMutation.mutate({
				type_employments: formik.values.employement_type.map((i) => +i),
			});
		},
	});
	const addTypeEmployementUserMutation = useMutation(addTypeEmployementUser, {
		onSuccess: () => router.push('/profile'),
	});

	const updateProfileMutation = useMutation(putProfileUser, {
		onSuccess: () => {
			removeSchedulesUserMutation.mutate({
				schedules: data.payload.schedules.map((i) => i.id),
			});
		},
	});

	const validatiionSchema = Yup.object().shape({
		minPrice: Yup.number().min(0).required(),
	});

	const suggestsMutation = useMutation(getSuggestions);

	const formik = useFormik({
		initialValues: {
			minPrice: null,
			experience: null,
			employement_type: [],
			schedule: [],
			ready_move: [],
			ready_mission: [],
		},
		validationSchema: validatiionSchema,
		onSubmit: (values) => {
			updateProfileMutation.mutate({
				user: {
					state: data.payload.state === 'created' ? 'moderating' : data.payload.state,
					job_category_id: jobCategory,
					previous_job: suggestion.label,
					min_salary: values.minPrice,
					experience: TO_EXPERIENCE[values.experience],
					ready_mission: !!values.ready_mission.length,
					ready_move: !!values.ready_move.length,
					skills: skills.join(' '),
				},
			});
		},
	});

	function getSuggestOptions() {
		if(suggestsMutation.isSuccess && suggestRequest) {
			return [
				{ value: suggestRequest, label: suggestRequest },
				...suggestsMutation.data.payload.map((i) => ({ value: i.id.toString(), label: i.name })),
			];
		}
		else if(suggestsMutation.isSuccess)
			return suggestsMutation.data.payload.map((i) => ({ value: i.id.toString(), label: i.name }));
		else 
			return [];
	}

	useEffect(() => suggestsMutation.mutate({ name: '' }), []);

	if(showSkillsSelect) {
		return (
			<SkillsSelectPage
				skills={skills}
				onClickBack={() => setShowSkillsSelect(false)}
				onContinue={(skills) => {
					setShowSkillsSelect(false);
					setSkills(skills);
				}} />
		);
	}
	else {
		return (
			<ModalLayout
				openedModal={showJobSelect && 'job_category'}
				modals={{
					'job_category': (
						<ProfileSelectJobModal
							selected={jobCategoriesQuery.isSuccess
								&& jobCategoriesQuery.data.payload.find((i) => i.id === jobCategory)
								? jobCategoriesQuery.data.payload.find((i) => i.id === jobCategory).name
								: null}
							onCloseModal={() => setShowJobSelect(false)}
							onContinue={(id) => {
								setJobCategory(id);
								setShowJobSelect(false);
							}} />
					),
				}}
			>
				<MainLayout className='bg-[#FAFBFC] pt-10 px-40'>
					<BackButton href='/profile' className='mb-10' />
					<Headline variant='5' tag='h1' className='font-bold mb-10'>
						Желаемая должность
					</Headline>
					<form onSubmit={formik.handleSubmit}>
						<div className='grid grid-cols-[repeat(2,auto)] gap-x-[100px] gap-y-8 max-w-[650px]'>
							<Paragraph variant='5' tag='p'>
								Желаемая должность	
							</Paragraph>
							<Select
								variant='primary'
								placeholder='Должность'
								isDanger={!suggestion && !!formik.submitCount}
								onInputChange={(newValue) => {
									if(newValue !== '')
										setSuggestRequest(newValue);
									else
										setSuggestRequest(null);
									suggestsMutation.mutate({ name: newValue });
								}}
								noOptionsMessage={() => 'Ничего не найдено'}
								loadingMessage={() => 'Загрузка...'}
								isLoading={suggestsMutation.isLoading}
								value={suggestion}
								onChange={setSuggestion}
								options={getSuggestOptions()} />
							<Paragraph variant='5' tag='p'>
								Сфера деятельности	
							</Paragraph>
							{(jobCategory || jobCategory === 0) && jobCategoriesQuery.isSuccess ? (
								<div className='grid gap-2 grid-flow-col'>
									<div className='bg-gray-40 py-3 px-4 rounded-lg'>
										{jobCategoriesQuery.data.payload.find((i) => i.id === jobCategory)
											&& jobCategoriesQuery.data.payload.find((i) => i.id === jobCategory).name}
									</div>
									<Button
										type='button'
										variant='outline_secondary'
										className='font-normal'
										onClick={() => setShowJobSelect(true)}
									>
										Изменить
									</Button>
								</div>
							) : (
								<Button
									type='button'
									variant='secondary'
									className='h-8 w-[88px] font-normal'
									onClick={() => setShowJobSelect(true)}
								>
									Выбрать
								</Button>
							)}
							<Paragraph variant='5' tag='p'>
								Зарплата, от	
							</Paragraph>
							<Input
								type='number'
								value={formik.values.minPrice}
								name='minPrice'
								isDanger={!!formik.errors.minPrice && !!formik.submitCount}
								onChange={formik.handleChange}
								placeholder='150 000 ₽' />
							<Paragraph variant='5' tag='p'>
								Опыт работы	
							</Paragraph>
							<div>
								<Radio
									className='grid gap-3'
									name='experience'
									value={formik.values.experience}
									onChange={formik.handleChange}
									items={['Нет опыта', '1 - 3 года', '3 - 6 лет', 'Более 6 лет']} />
							</div>
							<Paragraph variant='5' tag='p'>
								Тип занятости	
							</Paragraph>
							<div className='grid gap-3'>
								{typeEmploymentsQuery.data.payload.map((i) => (
									<Checkbox
										key={i.id}
										value={i.id}
										checked={formik.values.employement_type.includes(i.id.toString())}
										onChange={formik.handleChange}
										name='employement_type'
										label={i.name} />
								))}
							</div>
							<Paragraph variant='5' tag='p'>
								График работы	
							</Paragraph>
							<div className='grid gap-3'>
								{schedulesQuery.data.payload.map((i) => (
									<Checkbox
										key={i.id}
										value={i.id}
										checked={formik.values.schedule.includes(i.id.toString())}
										onChange={formik.handleChange}
										name='schedule'
										label={i.name} />
								))}
							</div>
							<Paragraph variant='5' tag='p'>
								Командировки и переезд
							</Paragraph>
							<div className='grid grid-cols-2 gap-x-3 gap-y-[17px]'>
								<Paragraph variant='5' tag='p'>
									Готов к командировкам
								</Paragraph>
								<Switch
									checked={!!formik.values.ready_mission.length}
									onChange={formik.handleChange}
									name='ready_mission'
									id='missions' />
								<Paragraph variant='5' tag='p'>
									Готов к переезду
								</Paragraph>
								<Switch
									checked={!!formik.values.ready_move.length}
									onChange={formik.handleChange}
									name='ready_move'
									id='move' />
							</div>
							<Paragraph variant='5' tag='p'>
								Профессиональные навыки
							</Paragraph>
							<div>
								<div className='flex flex-wrap mb-4'>
									{skills && skills.map((i, num) => (
										<span
											key={num}
											className='bg-softGold py-1 px-2 m-1 grid grid-cols-[1fr_auto] gap-3 rounded'
										>
											{i}
											<button
												type='button'
												onClick={() => setSkills((prev) => prev.filter((j) => j !== i))}
											>
												<CloseIcon className='fill-icon-secondary' />
											</button>
										</span>
									))}
								</div>
								<Button variant='secondary' className='h-8 w-[138px]' onClick={() => setShowSkillsSelect(true)}>
									Добавить навык
								</Button>
							</div>
						</div>
						<div className='grid grid-flow-col w-fit gap-2 mt-8'>
							{(updateProfileMutation.isLoading || removeSchedulesUserMutation.isLoading
							|| addSchedulesUserMutattion.isLoading || removeTypeEmployementUserMutation.isLoading
							|| addTypeEmployementUserMutation.isLoading)
								? (
									<LoaderIcon className='h-12 w-[209px]' />
								) : (
									<Button className='h-12 w-[209px]'>
										Сохранить изменения
									</Button>
								)}
							<Button
								type='button'
								variant='secondary'
								className='h-12 w-[114px]'
								onClick={() => router.push('/profile')}
							>
								Отмена
							</Button>
						</div>
					</form>
				</MainLayout>
			</ModalLayout>
		);
	}
};

export default withCheckAuthLayout(ResumePage, {
	checkLoggined: true,
	checkUserType: 'user',
});
