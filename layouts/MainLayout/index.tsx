import { HEADER_PRIMARY_ITEMS } from '../../shared/consts/header';
import Footer from '../Footer';
import Header from '../Header';
import Props from './MainLayout.props';

const MainLayout: React.FC<Props> = ({ children, headerItems = HEADER_PRIMARY_ITEMS, ...props }) => {
	return (
		<>
			<Header items={headerItems} className='py-4 px-40' />
			<main {...props}>
				{children}
			</main>
			<Footer className='pt-24 pb-9 px-40' />
		</>
	);
};

export default MainLayout;
