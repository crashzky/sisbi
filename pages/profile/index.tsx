import useUserType from '../../hooks/useUserType';
import withCheckAuthLayout from '../../layouts/CheckAuthLayout';
import ProfilePageEmployer from './_employer_profile';
import ProfilePageUser from './_user_profile';

const ProfilePage = (): JSX.Element => {
	const { userType } = useUserType();

	switch(userType) {
		case 'user':
			return <ProfilePageUser />;
		case 'employer':
			return <ProfilePageEmployer />;
		default:
			return <div></div>;
	}
};

export default withCheckAuthLayout(ProfilePage, {
	checkLoggined: true,
	returnRendered: false,
});
