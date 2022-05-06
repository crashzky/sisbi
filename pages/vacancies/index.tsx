import { useRouter } from 'next/router';
import Headline from '../../components/Headline';
import VacancyCard from '../../components/VacancyCard';
import withCheckAuthLayout from '../../layouts/CheckAuthLayout';
import { ICheckAuthConfig } from '../../layouts/CheckAuthLayout/CheckAuthLayout.props';
import ModalLayout from '../../layouts/ModalLayout';
import SearchLayout from '../../layouts/SearchLayout';
import VacanciesFiltres from '../../layouts/VacanciesFiltres';
import useModal from '../../hooks/useModal';
import { slide as Menu } from 'react-burger-menu';
import { useState } from 'react';

import LoginModal from '../../modals/LoginModal';
import SignupModal from '../../modals/SignupModal';
import SmsCodeModal from '../../modals/SmsCodeModal';
import SingupStep1Modal from '../../modals/SignupStep1Modal';
import SingupStep2Modal from '../../modals/SignupStep2Modal';
import SingupStep3Modal from '../../modals/SignupStep3Modal';
import SingupStep4Modal from '../../modals/SignupStep4Modal';
import SingupStep5Modal from '../../modals/SignupStep5Modal';
import SingupStep6Modal from '../../modals/SignupStep6Modal';
import SingupStepFinalModal from '../../modals/SignupStepFinalModal';
import SelectJobModal from '../../modals/SelectJobModal';
import RespondVacancyMenu from '../../components/RespondVacancyMenu';

const VacanciesPage = (): JSX.Element => {
	const router = useRouter();

	const [respondedVacancyId, setRespondedVacancyId] = useState(null);

	const { activeModal } = useModal(['login', 'signup', 'code', 'signup1', 'signup2', 'signup3', 'signup4', 'signup5',
		'signup6', 'signupFinal', 'job_categories']);

	const checkAuthConfig: ICheckAuthConfig = {
		checkLoggined: false,
		onAccessDenited: () => router.push(router.pathname),
	};

	const checkAuthConfig2: ICheckAuthConfig = {
		checkLoggined: true,
		onAccessDenited: () => router.push(router.pathname),
	};
	
	return (
		<ModalLayout modals={{
			'login': withCheckAuthLayout(LoginModal, checkAuthConfig),
			'code': withCheckAuthLayout(SmsCodeModal, checkAuthConfig),
			'signup': withCheckAuthLayout(SignupModal, checkAuthConfig),
			'signup1': withCheckAuthLayout(SingupStep1Modal, checkAuthConfig2),
			'signup2': withCheckAuthLayout(SingupStep2Modal, checkAuthConfig2),
			'signup3': withCheckAuthLayout(SingupStep3Modal, checkAuthConfig2),
			'signup4': withCheckAuthLayout(SingupStep4Modal, checkAuthConfig2),
			'signup5': withCheckAuthLayout(SingupStep5Modal, checkAuthConfig2),
			'signup6': withCheckAuthLayout(SingupStep6Modal, checkAuthConfig2),
			'signupFinal': withCheckAuthLayout(SingupStepFinalModal, checkAuthConfig2),
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

export default VacanciesPage;
