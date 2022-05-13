import { useEffect, useState } from 'react';
import withCheckAuthLayout from '../../../layouts/CheckAuthLayout';
import EmployerAboutPage from './_employer_about';
import UserAboutPage from './_user_about';

const AboutPage = (): JSX.Element => {
	const [userType, setUserType] = useState(null);

	useEffect(() => {
		setUserType(localStorage.getItem('user_type'));
	}, []);

	switch(userType) {
		case 'user':
			return <UserAboutPage />;
		case 'employer':
			return <EmployerAboutPage />;
		default:
			return <div></div>;
	}
};

export default withCheckAuthLayout(AboutPage, {
	checkLoggined: true,
	returnRendered: false,
});