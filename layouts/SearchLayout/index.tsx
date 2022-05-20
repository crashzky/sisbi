import { useEffect } from 'react';
import { useQuery } from 'react-query';
import useUserType from '../../hooks/useUserType';
import { getMyProfileEmployer, getMyProfileUser } from '../../shared/api/user';
import { HEADER_PRIMARY_ITEMS } from '../../shared/consts/header';
import Footer from '../Footer';
import Header from '../Header';
import SearchPanel from '../SearchPanel';
import Props from './SearchLayout.props';

const SearchLayout: React.FC<Props> = ({ children, className = '', headerItems = HEADER_PRIMARY_ITEMS, ...props }) => {
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
			<Header
				items={headerItems}
				userData={myProfileUser.isSuccess ? myProfileUser.data : myProfileEmployer.data}
				className='py-4 px-40' />
			<SearchPanel />
			<main className={className + ' bg-[#FAFBFC]'} {...props}>
				{children}
			</main>
			<Footer className='pt-24 pb-9 px-40 bg-[#FAFBFC]' />
		</>
	);
};

export default SearchLayout;
