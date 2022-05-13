import { useEffect, useState } from 'react';
import withCheckAuthLayout from '../../../layouts/CheckAuthLayout';
import EmployerEditPage from './_employer_edit';
import UserEditPage from './_user_edit';

const EitPage = (): JSX.Element => {
	const [userType, setUserType] = useState(null);

	useEffect(() => {
		setUserType(localStorage.getItem('user_type'));
	}, []);

	switch(userType) {
		case 'user':
			return <UserEditPage />;
		case 'employer':
			return <EmployerEditPage />;
		default:
			return <div></div>;
	}
};

export default withCheckAuthLayout(EitPage, {
	checkLoggined: true,
	returnRendered: false,
});