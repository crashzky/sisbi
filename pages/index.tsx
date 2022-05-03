import FeaturesSection from '../landing-secitions/FeaturesSection';
import LatestVacanciesSection from '../landing-secitions/LatestVacanciesSection';
import MainSection from '../landing-secitions/MainSection';
import MobileAppSection from '../landing-secitions/MobileAppSection';
import MainLayout from '../layouts/MainLayout';
import SearchPanel from '../layouts/SearchPanel';
import { HEADER_LANDING_ITEMS } from '../shared/consts/header';

const MainPage = (): JSX.Element => {
	return (
		<MainLayout headerItems={HEADER_LANDING_ITEMS}>
			<MainSection className='px-40 pt-14 pb-[267px]' />
			<SearchPanel />
			<LatestVacanciesSection className='pt-10 px-40' />
			<FeaturesSection className='my-[120px]' />
			<MobileAppSection />
		</MainLayout>
	);
};

export default MainPage;
