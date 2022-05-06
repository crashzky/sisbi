import { useFormik } from 'formik';
import { useQuery } from 'react-query';
import { getJobCategories } from '../../shared/api/job_categories';
import Props from './ProfileSelectJobModal.props';

import CloseIcon from '../../assets/general/close.svg';
import Paragraph from '../../components/Paragraph';
import Button from '../../components/Button';
import Radio from '../../components/Radio';

const ProfileSelectJobModal: React.FC<Props> = ({ className = '', onCloseModal, onContinue, selected, ...props }) => {
	const jobCategoriesQuery = useQuery('job_categories', getJobCategories, {
		initialData: [],
	});

	const formik = useFormik({
		initialValues: {
			job_category: selected,
		},
		onSubmit: (values) => {
			onContinue(jobCategoriesQuery.data.find((i) => i.name === values.job_category).id);
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
					<button onClick={onCloseModal}>
						<CloseIcon className='fill-icon-secondary' />
					</button>
				</div>
				<div className='h-[240px] overflow-y-scroll flex flex-col gap-2'>
					<Radio
						name='job_category'
						className='grid gap-2'
						value={formik.values.job_category}
						onChange={formik.handleChange}
						items={jobCategoriesQuery.data.map((i) => i.name)} />
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
					onClick={onCloseModal}
				>
					Отменить
				</Button>
				<div></div>
				<Button
					type='button'
					variant='outline_secondary'
					className='h-9 px-4'
					onClick={() => formik.setValues({ job_category: '' })}
				>
					Очистить
				</Button>
			</div>
		</form>
	);
};

export default ProfileSelectJobModal;
