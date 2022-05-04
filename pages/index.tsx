import FeaturesSection from '../landing-secitions/FeaturesSection';
import HelpSection from '../landing-secitions/HelpSection';
import LatestVacanciesSection from '../landing-secitions/LatestVacanciesSection';
import MainSection from '../landing-secitions/MainSection';
import MobileAppSection from '../landing-secitions/MobileAppSection';
import MainLayout from '../layouts/MainLayout';
import ModalLayout from '../layouts/ModalLayout';
import SearchPanel from '../layouts/SearchPanel';
import { HEADER_PRIMARY_ITEMS } from '../shared/consts/header';

import LoginModal from '../modals/LoginModal';
import SignupModal from '../modals/SignupModal';
import SingupStep1Modal from '../modals/SignupStep1Modal';
import SingupStep2Modal from '../modals/SignupStep2Modal';
import SingupStep3Modal from '../modals/SignupStep3Modal';
import SingupStep4Modal from '../modals/SignupStep4Modal';
import SingupStep5Modal from '../modals/SignupStep5Modal';
import SingupStep6Modal from '../modals/SignupStep6Modal';
import SingupStepFinalModal from '../modals/SignupStepFinalModal';

const MainPage = (): JSX.Element => {
	return (
		<ModalLayout modals={{
			'login': <LoginModal />,
			'signup': <SignupModal />,
			'signup1': <SingupStep1Modal />,
			'signup2': <SingupStep2Modal />,
			'signup3': <SingupStep3Modal />,
			'signup4': <SingupStep4Modal />,
			'signup5': <SingupStep5Modal />,
			'signup6': <SingupStep6Modal />,
			'signupFinal': <SingupStepFinalModal />,
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
