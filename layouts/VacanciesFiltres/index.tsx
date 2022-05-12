import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Input from '../../components/Input';
import Paragraph from '../../components/Paragraph';
import Radio from '../../components/Radio';
import { getJobCategories } from '../../shared/api/job_categories';
import Props from './VacanciesFiltres.props';
import { useFormik } from 'formik';
import { getSchedules } from '../../shared/api/schedules';
import { getTypeEmployments } from '../../shared/api/type_employments';
import { EXPERIENCE, TO_EXPERIENCE } from '../../shared/consts/profile';

const VacanciesFiltres: React.FC<Props> = ({ ...props }) => {
	const router = useRouter();

	const [job_category_id, setJobCategories] = useState([]);

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

	const formik = useFormik({
		initialValues: {
			salary: null,
			schedules: [],
			employment_types: [],
			experience: null,
		},
		onSubmit: (values) => {
			const { salary, schedules, employment_types, experience } = values;

			let params = [];
			if(salary)
				params.push(`salary=${salary}`);
			if(schedules)
				params.push(`schedules=${schedules}`);
			if(employment_types)
				params.push(`employment_types=${employment_types}`);
			if(experience)
				params.push(`experience=${TO_EXPERIENCE[experience]}`);
			if(job_category_id)
				params.push(`job_category_id=${JSON.stringify(job_category_id)}`);

			router.push(`/vacancies?${params.join('&')}`);
		},
	});

	useEffect(() => {
		const { job_category_id, salary, schedules, employment_types, experience } = router.query;

		if(job_category_id)
			setJobCategories(JSON.parse(job_category_id.toString()));

		formik.setValues({
			salary: salary ? +salary : null,
			schedules: schedules ? schedules.toString().split(',') : [],
			employment_types: employment_types ? employment_types.toString().split(',') : [],
			experience: experience ? EXPERIENCE[experience.toString()] : '',
		});
	}, [router]);

	return (
		<aside {...props}>
			<form onSubmit={formik.handleSubmit} className='h-min grid gap-10'>
				<div>
					<div className='mb-3 flex justify-between items-center'>
						<Paragraph variant='5' tag='h3' className='font-semibold'>
							Сфера деятельности
						</Paragraph>
						{!!job_category_id.length && (
							<button
								type='button'
								className='text-xs font-semibold text-darkBlue'
								onClick={() => {
									const { salary, schedules, employment_types, experience } = router.query;

									let params = [];
									if(salary)
										params.push(`salary=${salary}`);
									if(schedules)
										params.push(`schedules=${schedules}`);
									if(employment_types)
										params.push(`employment_types=${employment_types}`);
									if(experience)
										params.push(`experience=${experience}`);
									if(job_category_id)
										params.push(`job_category_id=${JSON.stringify(job_category_id)}`);

									router.push(`/vacancies?${params.join('&')}&modal=job_categories`);
								}}
							>
								Изменить
							</button>
						)}
					</div>
					{job_category_id.length && jobCategoriesQuery.data
						? (
							<div className='grid gap-2'>
								{job_category_id.map((i, num) => (
									<div key={num} className='py-3 px-4 bg-gray-40 rounded-lg'>
										{jobCategoriesQuery.data.payload.find((j) => j.id === +i)
											? jobCategoriesQuery.data.payload.find((j) => j.id === +i).name
											: ''}
									</div>
								))}
							</div>
						) : (
							<Button
								type='button'
								variant='secondary'
								className='w-[88px] font-normal h-9'
								onClick={() => {
									router.push('/vacancies?modal=job_categories'
										+ (router.query.job_category_id
											? `&job_category_id=${router.query.job_category_id}`
											: ''));
								}}
							>
								Выбрать
							</Button>
						)}
				</div>
				<div>
					<Paragraph variant='5' tag='h3' className='font-semibold mb-3'>
						Минимальная зарплата
					</Paragraph>
					<Input
						name='salary'
						value={formik.values.salary}
						onChange={formik.handleChange}
						placeholder='от 25 000 ₽'
						min={0}
						type='number' />
				</div>
				<div>
					<Paragraph variant='5' tag='h3' className='font-semibold mb-3'>
						График работы
					</Paragraph>
					<div className='grid gap-2'>
						{schedulesQuery.data.payload.map((i, num) => (
							<Checkbox
								key={num}
								name='schedules'
								onChange={formik.handleChange}
								checked={formik.values.schedules.includes(i.id.toString())}
								value={i.id}
								label={i.name} />
						))}
					</div>
				</div>
				<div>
					<Paragraph variant='5' tag='h3' className='font-semibold mb-3'>
						Тип занятости
					</Paragraph>
					<div className='grid gap-2'>
						{typeEmploymentsQuery.data.payload.map((i, num) => (
							<Checkbox
								key={num}
								name='employment_types'
								onChange={formik.handleChange}
								checked={formik.values.employment_types.includes(i.id.toString())}
								value={i.id}
								label={i.name} />
						))}
					</div>
				</div>
				<div>
					<Paragraph variant='5' tag='h3' className='font-semibold mb-3'>
						Опыт работы в сфере
					</Paragraph>
					<Radio
						className='grid gap-2'
						name='experience'
						onChange={formik.handleChange}
						value={formik.values.experience}
						items={['Нет опыта', '1 - 3 года', '3 - 6 лет', 'более 6 лет']} />
				</div>
				<div>
					<Button className='w-full h-12 mb-2'>
						Поменить фильтры
					</Button>
					<Button
						variant='secondary'
						className='w-full h-12'
						type='button'
						onClick={() => {
							formik.setValues({
								salary: null,
								schedules: [],
								employment_types: [],
								experience: null,
							});
							setJobCategories([]);
						}}
					>
						Очистить всё
					</Button>
				</div>
			</form>
		</aside>
	);
};

export default VacanciesFiltres;
