import { useEffect, useState } from 'react';
import { IResponse } from './useUserType.props';

const useUserType = (): IResponse => {
	const [userType, setUserType] = useState(null);

	useEffect(() => {
		setUserType(localStorage.getItem('user_type'));
	}, []);

	return {
		userType,
	};
};

export default useUserType;
