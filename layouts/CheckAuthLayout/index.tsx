import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ICheckAuthConfig } from './CheckAuthLayout.props';

const defaultConfig: ICheckAuthConfig = {
	checkLoggined: false,
	onAccessDenited: null,
	returnRendered: true,
};

function withCheckAuthLayout<T>(Component: React.FC<T>, config: ICheckAuthConfig = defaultConfig): JSX.Element | React.FC {
	function CheckAuthLayout(props): JSX.Element {
		const router = useRouter();

		const [isAuthed, setIsAuthed] = useState(null);

		useEffect(() => {
			if(localStorage.getItem('access_token'))
				setIsAuthed(true);
			else
				setIsAuthed(false);
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
