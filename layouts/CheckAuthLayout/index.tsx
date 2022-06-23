import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import useUserType from '../../hooks/useUserType';
import { getMyProfileUser } from '../../shared/api/user';
import { ICheckAuthConfig } from './CheckAuthLayout.props';

const defaultConfig: ICheckAuthConfig = {
	checkLoggined: false,
	onAccessDenited: null,
	returnRendered: true,
	checkUserType: null,
};

function withCheckAuthLayout<T>(Component: React.FC<T>, config: ICheckAuthConfig = defaultConfig): JSX.Element | React.FC {
	function CheckAuthLayout(props): JSX.Element {
		const router = useRouter();

		const { userType } = useUserType();

		const [isAuthed, setIsAuthed] = useState(null);

		useQuery('my_profile_user', getMyProfileUser, {
			retryDelay: 2,
			enabled: userType === 'user',
			onSuccess: (data) => {
				if(data && !data.payload.city && !document.URL.includes('?modal='))
					router.push('/?modal=signup1');
			},
		});

		useEffect(() => {
			if(localStorage.getItem('access_token'))
				setIsAuthed(true);
			else
				setIsAuthed(false);

			if(config.checkUserType && localStorage.getItem('user_type') !== config.checkUserType) {
				if(config.onAccessDenited)
					config.onAccessDenited();
				else
					router.push('/');
			}
		}, []);

		if(isAuthed && config.checkLoggined)
			return <Component {...props} />;
		else if(isAuthed === false && !config.checkLoggined)
			return <Component {...props} />;
		else if(isAuthed === null)
			return <></>;
		else {
			if(config.onAccessDenited)
				config.onAccessDenited();
			else
				router.push('/');
			return <></>;
		}
	};

	if(config.returnRendered)
		return <CheckAuthLayout />;
	else
		return CheckAuthLayout;
};

export default withCheckAuthLayout;
