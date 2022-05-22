import { IResponseActionRequest } from '../types/api/response';
import { IResponse } from '../types/api/vacancies';
import instance from './axios';

const acceptResponse = (data: IResponseActionRequest): Promise<IResponse> => {
	return instance.put(`/v1/employer/responses/${data.response_id}/accept`)
		.then((res) => res.data);
};

const declineResponse = (data: IResponseActionRequest): Promise<IResponse> => {
	return instance.put(`/v1/employer/responses/${data.response_id}/decline`)
		.then((res) => res.data);
};

export {
	acceptResponse,
	declineResponse,
};
