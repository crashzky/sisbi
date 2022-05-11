import FeaturesSection from '../landing-secitions/FeaturesSection';
import HelpSection from '../landing-secitions/HelpSection';
import LatestVacanciesSection from '../landing-secitions/LatestVacanciesSection';
import MainSection from '../landing-secitions/MainSection';
import MobileAppSection from '../landing-secitions/MobileAppSection';
import MainLayout from '../layouts/MainLayout';
import ModalLayout from '../layouts/ModalLayout';
import SearchPanel from '../layouts/SearchPanel';
import { HEADER_PRIMARY_ITEMS } from '../shared/consts/header';
import withCheckAuthLayout from '../layouts/CheckAuthLayout';
import { ICheckAuthConfig } from '../layouts/CheckAuthLayout/CheckAuthLayout.props';
import { useRouter } from 'next/router';

import LoginModal from '../modals/LoginModal';
import SmsCodeModal from '../modals/SmsCodeModal';
import SignupModal from '../modals/SignupModal';
import SingupStep1Modal from '../modals/SignupStep1Modal';
import SingupStep2Modal from '../modals/SignupStep2Modal';
import SingupStep3Modal from '../modals/SignupStep3Modal';
import SingupStep4Modal from '../modals/SignupStep4Modal';
import SingupStep5Modal from '../modals/SignupStep5Modal';
import SingupStep6Modal from '../modals/SignupStep6Modal';
import SingupStepFinalModal from '../modals/SignupStepFinalModal';
import SignupStep1EmployerModal from '../modals/SignupStep1EmployerModal';
import SignupStep2EmployerModal from '../modals/SignupStep2EmployerModal';

const MainPage = (): JSX.Element => {
	const router = useRouter();

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
			'signup1employer': withCheckAuthLayout(SignupStep1EmployerModal, checkAuthConfig2),
			'signup2employer': withCheckAuthLayout(SignupStep2EmployerModal, checkAuthConfig2),
		}}
		>
			<MainLayout headerItems={HEADER_PRIMARY_ITEMS}>
				<MainSection
					className='px-40 pt-14 pb-[267px]' 
					data-aos='fade-up'
					data-aos-duration='1000' />
				<SearchPanel
					data-aos='fade-up'
					data-aos-duration='1000' />
				<LatestVacanciesSection
					className='pt-10 px-40'
					data-aos='fade-up'
					data-aos-duration='1000' />
				<FeaturesSection
					className='py-[120px]'
					data-aos='fade-up'
					data-aos-duration='1000' />
				<MobileAppSection
					data-aos='fade-up'
					data-aos-duration='1000' />
				<HelpSection
					className='pt-[120px] px-40 pb-40'
					data-aos='fade-up'
					data-aos-duration='1000' />
			</MainLayout>
		</ModalLayout>
	);
};

export default MainPage;
