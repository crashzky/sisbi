import FeaturesSection from '../landing-secitions/FeaturesSection';
import HelpSection from '../landing-secitions/HelpSection';
import LatestVacanciesSection from '../landing-secitions/LatestVacanciesSection';
import MainSection from '../landing-secitions/MainSection';
import MobileAppSection from '../landing-secitions/MobileAppSection';
import MainLayout from '../layouts/MainLayout';
import ModalLayout from '../layouts/ModalLayout';
import SearchPanel from '../layouts/SearchPanel';
import LoginModal from '../modals/LoginModal';
import { HEADER_LANDING_ITEMS } from '../shared/consts/header';

const MainPage = (): JSX.Element => {
	return (
		<ModalLayout modals={{
			'login': <LoginModal />,
		}}
		>
			<MainLayout headerItems={HEADER_LANDING_ITEMS}>
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
