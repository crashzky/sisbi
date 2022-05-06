import Button from '../../components/Button';
import Paragraph from '../../components/Paragraph';
import Props from './SelectJobModal.props';
import { useQuery } from 'react-query';
import { getJobCategories } from '../../shared/api/job_categories';
import Checkbox from '../../components/Checkbox';
import { useRouter } from 'next/router';

import CloseIcon from '../../assets/general/close.svg';
import { useFormik } from 'formik';

const SelectJobModal: React.FC<Props> = ({ className = '', ...props }) => {
	const router = useRouter();

	const jobCategoriesQuery = useQuery('job_categories', getJobCategories, {
		initialData: [],
	});

	const formik = useFormik({
		initialValues: {
			job_categories: router.query.job_categories ? JSON.parse(router.query.job_categories.toString()) : [],
		},
		onSubmit: (values) => {
			delete router.query.modal;
			router.query.job_categories = JSON.stringify(values.job_categories);

			router.push({
				pathname: router.pathname,
				query: router.query,
			});
		},
	});

	return (
		<form
			onSubmit={formik.handleSubmit}
			className={className + ' bg-white rounded-2xl w-[552px] h-[415px] grid grid-rows-[1fr_auto]'}
			{...props}
		>
			<div className='p-6'>
				<div className='flex justify-between mb-6'>
					<Paragraph variant='1' tag='h2' className='font-semibold'>
						Выбор сферы деятельности
					</Paragraph>
					<button>
						<CloseIcon className='fill-icon-secondary' />
					</button>
				</div>
				<div className='h-[240px] overflow-y-scroll flex flex-col gap-2'>
					{jobCategoriesQuery.data.map((i) => (
						<Checkbox
							key={i.id}
							name='job_categories'
							onChange={formik.handleChange}
							checked={formik.values.job_categories.includes(i.id.toString())}
							value={i.id}
							label={i.name} />
					))}
				</div>
			</div>
			<div className='px-6 py-4 grid grid-cols-[auto_auto_1fr_auto] gap-2 border-t-[1px] border-button-secondary'>
				<Button className='h-9 px-4'>
					Применить
				</Button>
				<Button
					type='button'
					variant='secondary'
					className='h-9 px-4'
					onClick={() => {
						delete router.query.modal;

						router.push({
							pathname: router.pathname,
							query: router.query,
						});
					}}
				>
					Отменить
				</Button>
				<div></div>
				<Button
					type='button'
					variant='outline_secondary'
					className='h-9 px-4'
					onClick={() => formik.setValues({ job_categories: [] })}
				>
					Очистить все
				</Button>
			</div>
		</form>
	);
};

export default SelectJobModal;
