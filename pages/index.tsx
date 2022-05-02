import MainSection from '../landing-secitions/MainSection';
import MainLayout from '../layouts/MainLayout';
import SearchPanel from '../layouts/SearchPanel';
import { HEADER_LANDING_ITEMS } from '../shared/consts/header';

const MainPage = (): JSX.Element => {
	return (
		<MainLayout headerItems={HEADER_LANDING_ITEMS}>
			<MainSection className='px-40 pt-14 pb-[267px]' />
			<SearchPanel />
		</MainLayout>
	);
};

export default MainPage;
