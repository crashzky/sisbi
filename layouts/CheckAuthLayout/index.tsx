import { useEffect, useState } from 'react';
import { ICheckAuthConfig } from './CheckAuthLayout.props';

function withCheckAuthLayout<T>(Component: React.FC<T>, config: ICheckAuthConfig = {}): JSX.Element {
	function CheckAuthLayout(props): JSX.Element {
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
			return <></>;
		}
	};

	return <CheckAuthLayout />;
};

export default withCheckAuthLayout;
