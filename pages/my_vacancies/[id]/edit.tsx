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
import * as Yup from 'yup';
import removeItemFromArray from '../../../utils/removeItemFromArray';
import { getSuggestions } from '../../../shared/api/vacancies_suggestions';

import LoaderIcon from '../../../assets/loader.svg';

const NewVacancyPage = (): JSX.Element => {
	const router = useRouter();

	const [prevAvatar, setPrevAvatar] = useState<string>('/assets/no_selected_image.svg');
	const [avatar, setAvatar] = useState<File>();

	const [description, setDescription] = useState('');
	const [showDescriptionEditor, setShowDescriptionEditor] = useState(false);

	const [jobCategory, setJobCategory] = useState(null);
	const [showJobSelect, setShowJobSelect] = useState(false);

	const [city, setCity] = useState<ISelectOption>();

	const [errorsList, setErrorsList] = useState<string[]>([]);
	const [isSaveWithPublish, setIsSaveWithPublish] = useState(true);

	const [suggestion, setSuggestion] = useState<ISelectOption>();
	const [suggestRequest, setSuggestRequest] = useState<string>();

	useQuery([{ id: router.query.id }], getVacancyById, {
		enabled: !!(router && router.query),
		onSuccess: (res) => {
			const { title, salary, experience, type_employments, schedules, full_name, phone, email,
				description, job_category, avatar, city } = res.payload;

			if(title) {
				getSuggestions({ name: title })
					.then((res) => {
						if(res.total_entries && res.payload[0].name === title)	
							setSuggestion({ value: res.payload[0].id.toString(), label: res.payload[0].name });
						else if(res.total_entries)
							setSuggestion({ value: title, label: title });
					});
			}

			formik.setValues({
				title,
				salary,
				experience: EXPERIENCE[experience],
				employement_types: type_employments.map((i) => i.id.toString()),
				schedules: schedules.map((i) => i.id.toString()),
				
				contactFullName: full_name,
				contactPhone: phone.slice(2, phone.length),
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
	const suggestsMutation = useMutation(getSuggestions);

	const putVacancyMutation = useMutation(putVacancy, {
		onSuccess: (res) => removeSchedulesMutation.mutate({
			id: res.payload.id,
			schedules: res.payload.schedules.map((i) => i.id),
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
			type_employments: res.payload.type_employments.map((i) => i.id),
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

	const validatiionSchema = Yup.object().shape({
		title: Yup.string().required('required'),
		salary: Yup.number().required('required'),
		experience: Yup.string().required('required'),
		contactFullName: Yup.string().required('required'),
		contactPhone: Yup.string().required('required'),
		contactEmail: Yup.string().email().required('required'),
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
		validationSchema: validatiionSchema,
		onSubmit: (values) => {
			let _errorsList = [];

			if(!city)
				_errorsList.push('city');

			setErrorsList(_errorsList);

			const withAvatar = avatar ? {
				avatar,
			} : {};

			putVacancyMutation.mutate({
				id: +router.query.id,
				title: suggestion.label,
				salary: values.salary,
				experience: TO_EXPERIENCE[values.experience],
				full_name: values.contactFullName,
				email: values.contactEmail,
				phone: '+7' + (values.contactPhone as string).replaceAll(' ', ''),
				description: description,
				job_category_id: jobCategory,
				city_id: +city.value,
				visible: isSaveWithPublish,
				...withAvatar,
			});

			setIsSaveWithPublish(true);
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
							<Select
								variant='primary'
								placeholder='Например, менеджер по продажам'
								isDanger={!suggestion && !!formik.errors.title}
								onInputChange={(newValue) => {
									if(newValue)
										setSuggestRequest(newValue);
									else
										setSuggestRequest(undefined);

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
								value={formik.values.salary}
								name='salary'
								type='number'
								isDanger={!!formik.errors.salary}
								min={0}
								onChange={formik.handleChange}
								placeholder='Зарплата от 150 000 ₽' />
							<Paragraph variant='5' tag='p'>
								Регион
							</Paragraph>
							<Select
								placeholder='Город'
								value={city}
								isDanger={errorsList.includes('city')}
								onChange={(newValue) => {
									setCity(newValue);
									setErrorsList(removeItemFromArray(errorsList, 'city'));
								}}
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
									isDanger={!!formik.errors.contactFullName}
									onChange={formik.handleChange}
									placeholder='ФИО' />
								<InputPhone
									value={formik.values.contactPhone}
									isDanger={!!formik.errors.contactPhone}
									name='contactPhone'
									onChange={formik.handleChange} />
								<Input
									value={formik.values.contactEmail}
									name='contactEmail'
									isDanger={!!formik.errors.contactEmail}
									type='email'
									onChange={formik.handleChange}
									placeholder='Email-адрес' />
							</div>
							<Paragraph variant='5' tag='p'>
								Описание
							</Paragraph>
							<div>
								{description && (
									<div className='p-4 pb-6 bg-gray-40 rounded-xl mb-2'>
										{description && description.split('\n').map((i, num) => {
											if(num != description.split('\n').length - 1) {
												return (
													<Paragraph key={num} variant='5' tag='p'>
														{i}
														<br />
													</Paragraph>
												);
											}
											else {
												return (
													<Paragraph key={num} variant='5' tag='p'>
														{i}
													</Paragraph>
												);
											}
										})}
									</div>
								)}
								<div className='grid grid-cols-2 gap-2 h-9'>
									<Button
										type='button'
										variant='secondary'
										className='font-normal py-2 rounded-lg'
										onClick={() => setShowDescriptionEditor(true)}
									>
										{description ? 'Изменить описание' : 'Добавить описание'}
									</Button>
									{description && (
										<Button
											type='button'
											variant='outline_secondary'
											className='py-2 rounded-lg'
											style={{
												fontWeight: 400,
											}}
											onClick={() => setDescription('')}
										>
											Удалить описание
										</Button>
									)}
								</div>
							</div>
						</div>
						<div className='grid grid-flow-col w-fit gap-2 mt-8'>
							{putVacancyMutation.isLoading || addSchedulesMutation.isLoading
							|| addTypeEmployementsMutation.isLoading || removeSchedulesMutation.isLoading
							|| removeTypeEmployementsMutation.isLoading
								? (
									<LoaderIcon className='h-12 w-[209px]' />
								) : (
									<Button className='h-12 w-[229px]'>
										Сохранить и опубликовать
									</Button>
								)}
							{putVacancyMutation.isLoading || addSchedulesMutation.isLoading
							|| addTypeEmployementsMutation.isLoading || removeSchedulesMutation.isLoading
							|| removeTypeEmployementsMutation.isLoading
								? (
									<LoaderIcon className='h-12 w-[209px]' />
								) : (
									<Button
										variant='outline'
										className='h-12 w-[229px]'
										onClick={() => setIsSaveWithPublish(false)}
									>
										Сохранить без публикации
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
