import Button from '../../components/Button';
import Paragraph from '../../components/Paragraph';
import Props from './SelectJobModal.props';

import CloseIcon from '../../assets/general/close.svg';
import { useQuery } from 'react-query';
import { getJobCategories } from '../../shared/api/job_categories';
import Checkbox from '../../components/Checkbox';

const SelectJobModal: React.FC<Props> = ({ className = '', ...props }) => {
	const jobCategoriesQuery = useQuery('job_categories', getJobCategories, {
		initialData: [],
	});

	return (
		<form className={className + ' bg-white rounded-2xl w-[552px] h-[415px] grid grid-rows-[1fr_auto]'} {...props}>
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
							value={i.id}
							label={i.name} />
					))}
				</div>
			</div>
			<div className='px-6 py-4 grid grid-cols-[auto_auto_1fr_auto] gap-2 border-t-[1px] border-button-secondary'>
				<Button className='h-9 px-4'>
					Применить
				</Button>
				<Button variant='secondary' className='h-9 px-4'>
					Отменить
				</Button>
				<div></div>
				<Button variant='outline_secondary' className='h-9 px-4'>
					Очистить все
				</Button>
			</div>
		</form>
	);
};

export default SelectJobModal;
