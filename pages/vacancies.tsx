import Headline from '../components/Headline';
import VacancyCard from '../components/VacancyCard';
import SearchLayout from '../layouts/SearchLayout';
import VacanciesFiltres from '../layouts/VacanciesFiltres';

const VacanciesPage = (): JSX.Element => {
	return (
		<SearchLayout className='px-40'>
			<Headline variant='5' tag='h1' className='py-10 font-bold'>
				Найдено 16 вакансий
			</Headline>
			<div className='grid grid-cols-[216px_1fr] gap-[68px]'>
				<VacanciesFiltres />
				<div className='grid'>
					<VacancyCard
						className='rounded-t-3xl'
						imageSrc='/assets/DEV_ONLY.png'
						companyName='Jungu Digital'
						label='UI/UX дизайнер'
						minPrice={125000}
						description={`Плотно взаимодействовать с командой, и корректировать UI в соответствии с
							возможностями современных технологий. Контролировать реализацию UI/UX в конечном продукте.
							Что ты должен знать/уметь: Ты имеешь опыт работы в сфере мобильных IT продуктов в роли UI/UX.`}
						tags={['Опыт от 3 лет', 'Полный день', 'Удаленная работа', 'Любой город']} />
					<VacancyCard
						imageSrc='/assets/DEV_ONLY.png'
						companyName='Jungu Digital'
						label='UI/UX дизайнер'
						minPrice={125000}
						description={`Плотно взаимодействовать с командой, и корректировать UI в соответствии с
							возможностями современных технологий. Контролировать реализацию UI/UX в конечном продукте.
							Что ты должен знать/уметь: Ты имеешь опыт работы в сфере мобильных IT продуктов в роли UI/UX.`}
						tags={['Опыт от 3 лет', 'Полный день', 'Удаленная работа', 'Любой город']} />
					<VacancyCard
						imageSrc='/assets/DEV_ONLY.png'
						companyName='Jungu Digital'
						label='UI/UX дизайнер'
						minPrice={125000}
						description={`Плотно взаимодействовать с командой, и корректировать UI в соответствии с
							возможностями современных технологий. Контролировать реализацию UI/UX в конечном продукте.
							Что ты должен знать/уметь: Ты имеешь опыт работы в сфере мобильных IT продуктов в роли UI/UX.`}
						tags={['Опыт от 3 лет', 'Полный день', 'Удаленная работа', 'Любой город']} />
					<VacancyCard
						className='rounded-b-3xl'
						imageSrc='/assets/DEV_ONLY.png'
						companyName='Jungu Digital'
						label='UI/UX дизайнер'
						minPrice={125000}
						description={`Плотно взаимодействовать с командой, и корректировать UI в соответствии с
							возможностями современных технологий. Контролировать реализацию UI/UX в конечном продукте.
							Что ты должен знать/уметь: Ты имеешь опыт работы в сфере мобильных IT продуктов в роли UI/UX.`}
						tags={['Опыт от 3 лет', 'Полный день', 'Удаленная работа', 'Любой город']} />
				</div>
			</div>
		</SearchLayout>
	);
};

export default VacanciesPage;
