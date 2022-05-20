import { useEffect } from 'react';
import { useQuery } from 'react-query';
import useUserType from '../../hooks/useUserType';
import { getMyProfileEmployer, getMyProfileUser } from '../../shared/api/user';
import { HEADER_PRIMARY_ITEMS } from '../../shared/consts/header';
import Footer from '../Footer';
import Header from '../Header';
import Props from './MainLayout.props';

const MainLayout: React.FC<Props> = ({ children, headerItems = HEADER_PRIMARY_ITEMS, withFooter = true,
	withHeader = true, headerClassname, ...props }) => {
	const { userType } = useUserType();

	const myProfileUser = useQuery('my_profile_user', getMyProfileUser, {
		retryDelay: 2,
		enabled: userType === 'user',
	});

	const myProfileEmployer = useQuery('my_profile_employer', getMyProfileEmployer, {
		retryDelay: 2,
		enabled: userType === 'employer',
	});

	useEffect(() => {
		document.body.style.overflowY = 'scroll';
	}, []);

	return (
		<>
			{withHeader && (
				<Header
					items={headerItems}
					userData={myProfileUser.isSuccess ? myProfileUser.data : myProfileEmployer.data}
					className={'py-4 px-40 print:hidden ' + headerClassname} />
			)}
			<main {...props}>
				{children}
			</main>
			{withFooter && <Footer className='pt-24 pb-9 px-40 bg-[#FAFBFC] print:hidden' />}
		</>
	);
};

export default MainLayout;
