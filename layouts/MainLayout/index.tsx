import { useQuery } from 'react-query';
import { getMyProfile } from '../../shared/api/user';
import { HEADER_PRIMARY_ITEMS } from '../../shared/consts/header';
import Footer from '../Footer';
import Header from '../Header';
import Props from './MainLayout.props';

const MainLayout: React.FC<Props> = ({ children, headerItems = HEADER_PRIMARY_ITEMS, ...props }) => {
	const { data } = useQuery('my_profile', getMyProfile, {
		retryDelay: 4,
	});

	return (
		<>
			<Header
				items={headerItems}
				userData={data}
				className='py-4 px-40 print:hidden' />
			<main {...props}>
				{children}
			</main>
			<Footer className='pt-24 pb-9 px-40 bg-[#FAFBFC] print:hidden' />
		</>
	);
};

export default MainLayout;
