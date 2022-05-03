import Headline from '../../components/Headline';
import ShortVacancyCard from '../../components/ShortVacancyCard';
import Props from './LatestVacanciesSection.props';

import Arrow14SolidIcon from '../../assets/arrows/14_solid.svg';

const LatestVacanciesSection: React.FC<Props> = ({ className = '', ...props }) => {
	return (
		<section id='vacancies' className={className + ' '} {...props}>
			<Headline variant='5' tag='h2' className='font-bold mb-10'>
				Недавние вакансии
			</Headline>
			<div className='flex justify-between gap-4'>
				<ShortVacancyCard
					lastUpdate={new Date(Date.now())}
					label='Junior UI/UX дизайнер'
					minPrice={125000}
					description={`Плотно взаимодействовать с командой, и корректировать UI в соответствии с
						возможностями современных технологий. Контролировать реализацию UI/UX, быть ответственным
						за сдачу проекта в срок.`}
					tags={['Опыт от 3 лет', 'Полный день', 'Удаленная работа', 'Любой город']} />
				<ShortVacancyCard
					lastUpdate={new Date(Date.now())}
					label='Junior UI/UX дизайнер'
					minPrice={125000}
					description={`Плотно взаимодействовать с командой, и корректировать UI в соответствии с
						возможностями современных технологий. Контролировать реализацию UI/UX, быть ответственным
						за сдачу проекта в срок.`}
					tags={['Опыт от 3 лет', 'Полный день', 'Удаленная работа', 'Любой город']} />
				<ShortVacancyCard
					lastUpdate={new Date(Date.now())}
					label='Junior UI/UX дизайнер'
					minPrice={125000}
					description={`Плотно взаимодействовать с командой, и корректировать UI в соответствии с
						возможностями современных технологий. Контролировать реализацию UI/UX, быть ответственным
						за сдачу проекта в срок.`}
					tags={['Опыт от 3 лет', 'Полный день', 'Удаленная работа', 'Любой город']} />
				<button className='bg-gray-40 rounded-xl text-lg text-text font-semibold px-[77px] whitespace-nowrap'>
					<Arrow14SolidIcon className='mb-2 mx-auto' />
					Смотреть все
					<br />
					вакансии
				</button>
			</div>
		</section>
	);
};

export default LatestVacanciesSection;
