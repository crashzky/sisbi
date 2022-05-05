import { IUserResponse } from './user';

interface IGetSmsRequest {
	phone: string;
}

interface ISignupResponse {
	result_code: 'ok';
	payload: IUserResponse;
}

interface ISignupResponseError {
	messages: string[];
	errors: {
		error: {
			phone: string[];
		}
	};
}

interface ILoginRequest {
	auth: {
		phone: string;
		sms_pin: string;
	}
}

interface ILoginResponse {
	access_token: string;
}

export type {
	IGetSmsRequest,
	ISignupResponse,
	ISignupResponseError,
	ILoginRequest,
	ILoginResponse,
};
