import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import { HEADER_LANDING_ITEMS } from '../shared/consts/header';

const MainPage = (): JSX.Element => {
	return (
		<main>
			<Header items={HEADER_LANDING_ITEMS} />
			<Footer />
		</main>
	);
};

export default MainPage;
