import Button from '../../components/Button';
import Select from '../../components/Select';
import Props from './SearchPanel.props';

const SearchPanel: React.FC<Props> = ({ className = '', ...props }) => {
	return (
		<section className={className + ' bg-darkBlue py-4 px-40 grid grid-cols-between gap-4'} {...props}>
			<Select
				variant='with_gap'
				placeholder='Ваш город'
				options={[]} />
			<Select
				variant='with_gap'
				placeholder='Название должности'
				options={[]} />
			<Button variant='outline' className='w-[104px] h-12'>
				Найти
			</Button>
		</section>
	);
};

export default SearchPanel;
