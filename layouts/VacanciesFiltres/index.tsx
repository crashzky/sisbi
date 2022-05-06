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

const VacanciesFiltres: React.FC<Props> = ({ ...props }) => {
	const router = useRouter();

	const [job_categories, setJobCategories] = useState([]);

	const jobCategoriesQuery = useQuery('job_categories', getJobCategories, {
		initialData: [],
	});

	const schedulesQuery = useQuery('schedules', getSchedules, {
		initialData: [],
	});

	const typeEmploymentsQuery = useQuery('type_employments', getTypeEmployments, {
		initialData: [],
	});

	const formik = useFormik({
		initialValues: {
			minPrice: null,
			schedules: [],
			employment_types: [],
			experience: null,
		},
		onSubmit: (values) => {
			const { minPrice, schedules, employment_types, experience } = values;
			router.push(`/vacancies?minPrice=${minPrice}&schedules=${JSON.stringify(schedules)}
				&employment_types=${JSON.stringify(employment_types)}&experience=${JSON.stringify(experience)}
				&job_categories=${JSON.stringify(job_categories)}`);
		},
	});

	useEffect(() => {
		const { job_categories, minPrice, schedules, employment_types, experience } = router.query;

		if(job_categories)
			setJobCategories(JSON.parse(job_categories.toString()));

		formik.setValues({
			minPrice: minPrice ? +minPrice : null,
			schedules: schedules ? JSON.parse(schedules.toString()) : [],
			employment_types: employment_types ? JSON.parse(employment_types.toString()) : [],
			experience: experience ? JSON.parse(experience.toString()) : '',
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
						{!!job_categories.length && (
							<button
								type='button'
								className='text-xs font-semibold text-darkBlue'
								onClick={() => {
									const { minPrice, schedules, employment_types, experience } = router.query;

									router.push(`/vacancies?minPrice=${minPrice}
										&schedules=${schedules}
										&employment_types=${employment_types}
										&experience=${experience}
										&job_categories=${JSON.stringify(job_categories)}
										&modal=job_categories`);
								}}
							>
								Изменить
							</button>
						)}
					</div>
					{job_categories.length && jobCategoriesQuery.data
						? (
							<div className='grid gap-2'>
								{job_categories.map((i, num) => (
									<div key={num} className='py-3 px-4 bg-gray-40 rounded-lg'>
										{jobCategoriesQuery.data.find((j) => j.id === +i)
											? jobCategoriesQuery.data.find((j) => j.id === +i).name
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
										+ (router.query.job_categories
											? `&job_categories=${router.query.job_categories}`
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
						name='minPrice'
						value={formik.values.minPrice}
						onChange={formik.handleChange}
						placeholder='от 25 000 ₽'
						type='number' />
				</div>
				<div>
					<Paragraph variant='5' tag='h3' className='font-semibold mb-3'>
						График работы
					</Paragraph>
					<div className='grid gap-2'>
						{schedulesQuery.data.map((i, num) => (
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
						{typeEmploymentsQuery.data.map((i, num) => (
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
						items={['не имеет значение', 'без опыта', '1 - 3 года', '3 - 6 лет', 'более 6 лет']} />
				</div>
				<div>
					<Button className='w-full h-12 mb-2'>
						Поменять фильтры
					</Button>
					<Button
						variant='secondary'
						className='w-full h-12'
						type='button'
						onClick={() => {
							formik.setValues({
								minPrice: null,
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
