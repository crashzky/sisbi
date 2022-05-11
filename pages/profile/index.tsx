import { useEffect, useState } from 'react';
import withCheckAuthLayout from '../../layouts/CheckAuthLayout';
import ProfilePageUser from './_user_profile';

const ProfilePage = (): JSX.Element => {
	const [userType, setUserType] = useState(null);

	useEffect(() => {
		setUserType(localStorage.getItem('user_type'));
	}, []);

	switch(userType) {
		case 'user':
			return <ProfilePageUser />;
		default:
			return <div></div>;
	}
};

export default withCheckAuthLayout(ProfilePage, {
	checkLoggined: true,
	returnRendered: false,
});
