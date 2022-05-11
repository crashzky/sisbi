import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getMyProfileEmployer, getMyProfileUser } from '../../shared/api/user';
import { HEADER_PRIMARY_ITEMS } from '../../shared/consts/header';
import Footer from '../Footer';
import Header from '../Header';
import SearchPanel from '../SearchPanel';
import Props from './SearchLayout.props';

const SearchLayout: React.FC<Props> = ({ children, className = '', headerItems = HEADER_PRIMARY_ITEMS, ...props }) => {
	const [userType, setUserType] = useState(null);

	const myProfileUser = useQuery('my_profile_user', getMyProfileUser, {
		retryDelay: 4,
		enabled: userType === 'user',
	});

	const myProfileEmployer = useQuery('my_profile_employer', getMyProfileEmployer, {
		retryDelay: 4,
		enabled: userType === 'employer',
	});

	useEffect(() => {
		setUserType(localStorage.getItem('user_type'));
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
