import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import Headline from '../../../components/Headline';
import Input from '../../../components/Input';
import InputImage from '../../../components/InputImage';
import InputPhone from '../../../components/InputPhone';
import Paragraph from '../../../components/Paragraph';
import Radio from '../../../components/Radio';
import withCheckAuthLayout from '../../../layouts/CheckAuthLayout';
import MainLayout from '../../../layouts/MainLayout';
import ModalLayout from '../../../layouts/ModalLayout';
import ProfileSelectJobModal from '../../../modals/ProfileSelectJobModal';
import { getJobCategories } from '../../../shared/api/job_categories';
import { getSchedules } from '../../../shared/api/schedules';
import { getTypeEmployments } from '../../../shared/api/type_employments';
import { EXPERIENCE, TO_EXPERIENCE } from '../../../shared/consts/profile';
import { useRouter } from 'next/router';
import EditDescriptionPage from './../_description';
import { getCities } from '../../../shared/api/cities';
import Select from '../../../components/Select';
import { ISelectOption } from '../../../components/Select/Select.props';
import { addSchedulesVacancy, addTypeEmployementsVacancy,
	getVacancyById,
	putVacancy,
	removeSchedulesVacancy, removeTypeEmployementsVacancy } from '../../../shared/api/vacancies';

import LoaderIcon from '../../../assets/loader.svg';

const NewVacancyPage = (): JSX.Element => {
	const router = useRouter();

	const [prevAvatar, setPrevAvatar] = useState<string>();
	const [avatar, setAvatar] = useState<File>();

	const [description, setDescription] = useState('');
	const [showDescriptionEditor, setShowDescriptionEditor] = useState(false);

	const [jobCategory, setJobCategory] = useState(null);
	const [showJobSelect, setShowJobSelect] = useState(false);

	const [city, setCity] = useState<ISelectOption>();

	const getVacancyQuery = useQuery([{ id: router.query.id }], getVacancyById, {
		enabled: !!(router && router.query),
		onSuccess: (res) => {
			const { title, salary, experience, type_employments, schedules, full_name, phone, email,
				description, job_category, avatar, city } = res.payload[0];

			formik.setValues({
				title,
				salary,
				experience: EXPERIENCE[experience],
				employement_types: type_employments.map((i) => i.id.toString()),
				schedules: schedules.map((i) => i.id.toString()),
				
				contactFullName: full_name,
				contactPhone: phone,
				contactEmail: email,
			});

			setDescription(description);
			setJobCategory(job_category.id);
			setPrevAvatar(avatar);
			setCity({ value: city.id.toString(), label: city.name });
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

	const typeEmployementsQuery = useQuery('type_employments', getTypeEmployments, {
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

	const citiesMutation = useMutation(getCities);

	const putVacancyMutation = useMutation(putVacancy, {
		onSuccess: (res) => removeSchedulesMutation.mutate({
			id: res.payload.id,
			schedules: getVacancyQuery.data.payload[0].schedules.map((i) => i.id),
		}),
	});

	const removeSchedulesMutation = useMutation(removeSchedulesVacancy, {
		onSuccess: (res) => addSchedulesMutation.mutate({
			id: res.payload.id,
			schedules: formik.values.schedules.map((i) => +i),
		}),
	});

	const addSchedulesMutation = useMutation(addSchedulesVacancy, {
		onSuccess: (res) => removeTypeEmployementsMutation.mutate({
			id: res.payload.id,
			type_employments: getVacancyQuery.data.payload[0].type_employments.map((i) => i.id),
		}),
	});

	const removeTypeEmployementsMutation = useMutation(removeTypeEmployementsVacancy, {
		onSuccess: (res) => addTypeEmployementsMutation.mutate({
			id: res.payload.id,
			type_employments: formik.values.schedules.map((i) => +i),
		}),
	});

	const addTypeEmployementsMutation = useMutation(addTypeEmployementsVacancy, {
		onSuccess: (res) => router.push(`/my_vacancies/${res.payload.id}`),
	});

	const formik = useFormik({
		initialValues: {
			title: '',
			salary: 0,
			experience: null,
			employement_types: [],
			schedules: [],
			
			contactFullName: '',
			contactPhone: null,
			contactEmail: '',
		},
		onSubmit: (values) => {
			const withAvatar = avatar ? {
				avatar,
			} : {};

			putVacancyMutation.mutate({
				id: +router.query.id,
				title: values.title,
				salary: values.salary,
				experience: TO_EXPERIENCE[values.experience],
				full_name: values.contactFullName,
				email: values.contactEmail,
				phone: values.contactPhone,
				description,
				job_category_id: jobCategory,
				city_id: +city.value,
				...withAvatar,
			});
		},
	});
	
	useEffect(() => citiesMutation.mutate({ name: '' }), []);

	if(showDescriptionEditor) {
		return (
			<EditDescriptionPage
				initialValue={description}
				onContinue={(value) => {
					setDescription(value);
					setShowDescriptionEditor(false);
				}}
				onBack={() => setShowDescriptionEditor(false)} />
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
					<BackButton href='/my_vacancies' className='mb-10' />
					<Headline variant='5' tag='h1' className='font-bold'>
						Описание вакансии
					</Headline>
					<form onSubmit={formik.handleSubmit}>
						<div className='grid grid-cols-[repeat(2,auto)] gap-x-[100px] gap-y-8 max-w-[650px] mt-10'>
							<Paragraph variant='5' tag='p'>
								Превью для вакансии
							</Paragraph>
							<InputImage
								noSelectedImage={prevAvatar}
								onChange={(e) => setAvatar(e.target.files[0])} />
							<Paragraph variant='5' tag='p'>
								Название вакансии
							</Paragraph>
							<Input
								value={formik.values.title}
								name='title'
								onChange={formik.handleChange}
								placeholder='Например, Junior UI/UX дизайнер' />
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
								value={formik.values.salary}
								name='salary'
								type='number'
								min={0}
								onChange={formik.handleChange}
								placeholder='Зарплата от 150 000 ₽' />
							<Paragraph variant='5' tag='p'>
								Регион
							</Paragraph>
							<Select
								placeholder='Город'
								value={city}
								onChange={setCity}
								isLazyLoad
								onInputChange={(newValue) => citiesMutation.mutate({ name: newValue })}
								noOptionsMessage={() => 'Ничего не найдено'}
								loadingMessage={() => 'Загрузка...'}
								isLoading={citiesMutation.isLoading}
								options={citiesMutation.isSuccess
									? citiesMutation.data.payload.map((i) => ({ value: i.id.toString(), label: i.name }))
									: []} />
							<Paragraph variant='5' tag='p'>
								Опыт работы
							</Paragraph>
							<Radio
								className='grid gap-3'
								name='experience'
								value={formik.values.experience}
								onChange={formik.handleChange}
								items={Object.keys(TO_EXPERIENCE)} />
							<Paragraph variant='5' tag='p'>
								Тип занятости
							</Paragraph>
							<div className='grid gap-3'>
								{typeEmployementsQuery.isSuccess && typeEmployementsQuery.data.payload.map((i, num) => (
									<Checkbox
										key={num}
										label={i.name}
										name='employement_types'
										value={i.id}
										onChange={formik.handleChange}
										checked={formik.values.employement_types.includes(i.id.toString())} />
								))}
							</div>
							<Paragraph variant='5' tag='p'>
								График работы
							</Paragraph>
							<div className='grid gap-3'>
								{schedulesQuery.isSuccess && schedulesQuery.data.payload.map((i, num) => (
									<Checkbox
										key={num}
										label={i.name}
										name='schedules'
										value={i.id}
										onChange={formik.handleChange}
										checked={formik.values.schedules.includes(i.id.toString())} />
								))}
							</div>
							<Paragraph variant='5' tag='p'>
								Контактные данные
							</Paragraph>
							<div className='grid gap-2'>
								<Input
									value={formik.values.contactFullName}
									name='contactFullName'
									onChange={formik.handleChange}
									placeholder='ФИО' />
								<InputPhone
									value={formik.values.contactPhone}
									name='contactPhone'
									onChange={formik.handleChange} />
								<Input
									value={formik.values.contactEmail}
									name='contactEmail'
									type='email'
									onChange={formik.handleChange}
									placeholder='Email-адрес' />
							</div>
							<Paragraph variant='5' tag='p'>
								Описание
							</Paragraph>
							<Button
								type='button'
								variant='secondary'
								className='h-9 w-[150px] font-normal rounded-lg'
								onClick={() => setShowDescriptionEditor(true)}
							>
								{description ? 'Изменить описание' : 'Добавить описание'}
							</Button>
						</div>
						<div className='grid grid-flow-col w-fit gap-2 mt-8'>
							{putVacancyMutation.isLoading || addSchedulesMutation.isLoading
							|| addTypeEmployementsMutation.isLoading || removeSchedulesMutation.isLoading
							|| removeTypeEmployementsMutation.isLoading
								? (
									<LoaderIcon className='h-12 w-[209px]' />
								) : (
									<Button className='h-12 w-[229px]'>
										Сохранить
									</Button>
								)}
							<Button
								type='button'
								variant='secondary'
								className='h-12 w-[114px]'
								onClick={() => router.push('/my_vacancies')}
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

export default withCheckAuthLayout(NewVacancyPage, {
	checkLoggined: true,
	checkUserType: 'employer',
});
