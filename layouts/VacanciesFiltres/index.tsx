import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Input from '../../components/Input';
import Paragraph from '../../components/Paragraph';
import Radio from '../../components/Radio';
import Props from './VacanciesFiltres.props';

const VacanciesFiltres: React.FC<Props> = ({ className = '', ...props }) => {
	return (
		<aside className={className + ' grid gap-10'} {...props}>
			<div>
				<Paragraph variant='5' tag='h3' className='font-semibold mb-3'>
					Сфера деятельности
				</Paragraph>
				<Button variant='secondary' className='w-[88px] font-normal h-9'>
					Выбрать
				</Button>
			</div>
			<div>
				<Paragraph variant='5' tag='h3' className='font-semibold mb-3'>
					Зарплата
				</Paragraph>
				<Input placeholder='от 25 000 ₽' type='number' />
			</div>
			<div>
				<Paragraph variant='5' tag='h3' className='font-semibold mb-3'>
					График работы
				</Paragraph>
				<div className='grid gap-2'>
					<Checkbox label='полный рабочий день' />
					<Checkbox label='гибкий' />
					<Checkbox label='смежный' />
					<Checkbox label='стажировка' />
				</div>
			</div>
			<div>
				<Paragraph variant='5' tag='h3' className='font-semibold mb-3'>
					Тип занятости
				</Paragraph>
				<div className='grid gap-2'>
					<Checkbox label='удалённая' />
					<Checkbox label='полная' />
					<Checkbox label='частичная' />
					<Checkbox label='проектная' />
				</div>
			</div>
			<div>
				<Paragraph variant='5' tag='h3' className='font-semibold mb-3'>
					Опыт работы в сфере
				</Paragraph>
				<Radio
					className='grid gap-2'
					name='experience'
					items={['не имеет значение', 'без опыта', '1 - 3 года', '3 - 6 лет', 'более 6 лет']} />
			</div>
			<div>
				<Button className='w-full h-12 mb-2'>
					Поменять фильтры
				</Button>
				<Button variant='secondary' className='w-full h-12'>
					Очистить всё
				</Button>
			</div>
		</aside>
	);
};

export default VacanciesFiltres;
