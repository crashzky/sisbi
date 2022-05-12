import { useRouter } from 'next/router';
import Headline from '../../components/Headline';
import VacancyCard from '../../components/VacancyCard';
import ModalLayout from '../../layouts/ModalLayout';
import SearchLayout from '../../layouts/SearchLayout';
import VacanciesFiltres from '../../layouts/VacanciesFiltres';
import useModal from '../../hooks/useModal';
import { slide as Menu } from 'react-burger-menu';
import { useState } from 'react';

import SelectJobModal from '../../modals/SelectJobModal';
import RespondVacancyMenu from '../../components/RespondVacancyMenu';
import withCheckAuthLayout from '../../layouts/CheckAuthLayout';

const VacanciesPage = (): JSX.Element => {
	const router = useRouter();

	const [respondedVacancyId, setRespondedVacancyId] = useState(null);

	const { activeModal } = useModal(['job_categories']);

	return (
		<ModalLayout modals={{
			'job_categories': <SelectJobModal />,
		}}
		>
			<Menu
				right
				isOpen={!!respondedVacancyId}
				burgerButtonClassName='hidden'
				onClose={() => setRespondedVacancyId(null)}
				width={457}
			>
				<RespondVacancyMenu
					className='rounded-t-3xl'
					companyName='Jungu Digital'
					vacancyName='UI/UX дизайнер'
					vacancyId={1}
					minPrice={125000}
					contactName='Мария Соколова'
					contactPhone={9139822927}
					contactMail='mail@mail.ru'
					onContinue={() => setRespondedVacancyId(null)}
					onBack={() => setRespondedVacancyId(null)} />
			</Menu>
			<SearchLayout className='px-40'>
				<Headline variant='5' tag='h1' className='py-10 font-bold'>
					Найдено 16 вакансий
				</Headline>
				<div className='grid grid-cols-[216px_1fr] gap-[68px]'>
					<VacanciesFiltres style={{
						gap: activeModal && '0px',
					}} />
					<div className='grid'>
						<VacancyCard
							onClick={() => router.push('/vacancies/1')}
							className='rounded-t-3xl'
							imageSrc='/assets/DEV_ONLY.png'
							companyName='Jungu Digital'
							label='UI/UX дизайнер'
							minPrice={125000}
							description={`Плотно взаимодействовать с командой, и корректировать UI в соответствии с
								возможностями современных технологий. Контролировать реализацию UI/UX в конечном продукте.
								Что ты должен знать/уметь: Ты имеешь опыт работы в сфере мобильных IT продуктов в роли UI/UX.`}
							tags={['Опыт от 3 лет', 'Полный день', 'Удаленная работа', 'Любой город']}
							contactName='Мария Соколова'
							contactPhone={9139822927}
							contactMail='mail@mail.ru'
							onRespond={() => setRespondedVacancyId(1)} />
						<VacancyCard
							onClick={() => router.push('/vacancies/1')}
							imageSrc='/assets/DEV_ONLY.png'
							companyName='Jungu Digital'
							label='UI/UX дизайнер'
							minPrice={125000}
							description={`Плотно взаимодействовать с командой, и корректировать UI в соответствии с
								возможностями современных технологий. Контролировать реализацию UI/UX в конечном продукте.
								Что ты должен знать/уметь: Ты имеешь опыт работы в сфере мобильных IT продуктов в роли UI/UX.`}
							tags={['Опыт от 3 лет', 'Полный день', 'Удаленная работа', 'Любой город']}
							contactName='Мария Соколова'
							contactPhone={9139822927}
							contactMail='mail@mail.ru'
							onRespond={() => setRespondedVacancyId(1)} />
						<VacancyCard
							onClick={() => router.push('/vacancies/1')}
							imageSrc='/assets/DEV_ONLY.png'
							companyName='Jungu Digital'
							label='UI/UX дизайнер'
							minPrice={125000}
							description={`Плотно взаимодействовать с командой, и корректировать UI в соответствии с
								возможностями современных технологий. Контролировать реализацию UI/UX в конечном продукте.
								Что ты должен знать/уметь: Ты имеешь опыт работы в сфере мобильных IT продуктов в роли UI/UX.`}
							tags={['Опыт от 3 лет', 'Полный день', 'Удаленная работа', 'Любой город']}
							contactName='Мария Соколова'
							contactPhone={9139822927}
							contactMail='mail@mail.ru'
							onRespond={() => setRespondedVacancyId(1)} />
						<VacancyCard
							onClick={() => router.push('/vacancies/1')}
							className='rounded-b-3xl'
							imageSrc='/assets/DEV_ONLY.png'
							companyName='Jungu Digital'
							label='UI/UX дизайнер'
							minPrice={125000}
							description={`Плотно взаимодействовать с командой, и корректировать UI в соответствии с
								возможностями современных технологий. Контролировать реализацию UI/UX в конечном продукте.
								Что ты должен знать/уметь: Ты имеешь опыт работы в сфере мобильных IT продуктов в роли UI/UX.`}
							tags={['Опыт от 3 лет', 'Полный день', 'Удаленная работа', 'Любой город']}
							contactName='Мария Соколова'
							contactPhone={9139822927}
							contactMail='mail@mail.ru'
							onRespond={() => setRespondedVacancyId(1)} />
					</div>
				</div>
			</SearchLayout>
		</ModalLayout>
	);
};

export default withCheckAuthLayout(VacanciesPage, {
	checkLoggined: true,
});
