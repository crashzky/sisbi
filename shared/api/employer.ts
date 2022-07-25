import { IGetEmployerRequest, IGetEmployerResponse } from '../types/api/employer';
import instance from './axios';

const getEmployerById = (data: IGetEmployerRequest): Promise<IGetEmployerResponse> => {
	return instance.get(`/v1/employers/${data.queryKey[0].id}`)
		.then((res) => res.data);
};

export {
	getEmployerById,
};
