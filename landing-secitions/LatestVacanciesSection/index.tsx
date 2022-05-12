import Headline from '../../components/Headline';
import ShortVacancyCard from '../../components/ShortVacancyCard';
import Props from './LatestVacanciesSection.props';

import Arrow14SolidIcon from '../../assets/arrows/14_solid.svg';
import { useQuery } from 'react-query';
import { getRecentVacancies } from '../../shared/api/vacancies';
import { EXPERIENCE } from '../../shared/consts/profile';

const LatestVacanciesSection: React.FC<Props> = ({ className = '', ...props }) => {
	const { data, isSuccess } = useQuery('recent_vacancies', getRecentVacancies);

	return (
		<section id='vacancies' className={className + ' '} {...props}>
			<Headline variant='5' tag='h2' className='font-bold mb-10'>
				Недавние вакансии
			</Headline>
			<div className='flex flex-wrap justify-between gap-4'>
				{isSuccess && data.payload.map((i, num) => (
					<ShortVacancyCard
						className='w-[268px]'
						key={num}
						lastUpdate={new Date(i.updated_at)}
						label={i.title}
						minPrice={i.salary}
						description={i.description}
						tags={[
							i.job_category.name, EXPERIENCE[i.experience], ...i.type_employments.map((i) => i.name),
							...i.schedules.map((i) => i.name)]} />	
				))}
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
