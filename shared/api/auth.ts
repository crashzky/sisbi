import { IGetSmsRequest, ILoginRequest, ILoginResponse, ISignupResponse, ISignupResponseError } from '../types/api/auth';
import { ICommonResponse, ICommonResponseError } from '../types/api/common';
import instance from './axios';

const signup = (data: IGetSmsRequest): Promise<ISignupResponse | ISignupResponseError> => {
	return instance.post('/v1/user', data)
		.then((res) => res.data);
};

const getSmsCode = (data: IGetSmsRequest): Promise<ICommonResponse | ICommonResponseError> => {
	return instance.post('/v1/users_sms', data)
		.then((res) => res.data);
};

const login = (data: ILoginRequest): Promise<ILoginResponse> => {
	return instance.post('/v1/auth/user_token', data)
		.then((res) => res.data);
};

export {
	signup,
	getSmsCode,
	login,
};
