import { IGetSmsRequest, ILoginRequest, ILoginResponse, ISignupEmployerRequest,
	ISignupResponse, ISignupResponseError, ISignupUserRequest } from '../types/api/auth';
import { ICommonResponse, ICommonResponseError } from '../types/api/common';
import instance from './axios';

// User

const signupUser = (data: ISignupUserRequest): Promise<ISignupResponse | ISignupResponseError> => {
	return instance.post('/v1/user', data)
		.then((res) => res.data);
};

const getSmsCodeUser = (data: IGetSmsRequest): Promise<ICommonResponse | ICommonResponseError> => {
	return instance.post('/v1/users_sms', data)
		.then((res) => res.data);
};

const loginUser = (data: ILoginRequest): Promise<ILoginResponse> => {
	return instance.post('/v1/auth/user_token', data)
		.then((res) => res.data);
};

// Employer

const signupEmployer = (data: ISignupEmployerRequest): Promise<ISignupResponse | ISignupResponseError> => {
	return instance.post('/v1/employer/profile', data)
		.then((res) => res.data);
};

const getSmsCodeEmployer = (data: IGetSmsRequest): Promise<ICommonResponse | ICommonResponseError> => {
	return instance.post('/v1/employer/employers_sms', data)
		.then((res) => res.data);
};

const loginEmployer = (data: ILoginRequest): Promise<ILoginResponse> => {
	return instance.post('/v1/auth/employer_token', data)
		.then((res) => res.data);
};

export {
	signupUser,
	getSmsCodeUser,
	loginUser,

	signupEmployer,
	getSmsCodeEmployer,
	loginEmployer,	
};
