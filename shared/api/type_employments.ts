import { ITypeEmployment, ITypeEmploymentByIdRequest, ITypeEmploymentResponse,
	IUpdateTypeEmploymentsRequest } from '../types/api/type_employments';
import { IUserResponse } from '../types/api/user';
import instance from './axios';

const getTypeEmployments = (): Promise<ITypeEmploymentResponse> => {
	return instance.get('/v1/type_employments')
		.then((res) => res.data);
};

const getTypeEmploymentById = (data: ITypeEmploymentByIdRequest): Promise<ITypeEmployment> => {
	return instance.get(`/v1/type_employments/${data.id}`)
		.then((res) => res.data);
};

const addTypeEmployementUser = (data: IUpdateTypeEmploymentsRequest): Promise<IUserResponse> => {
	return instance.put('/v1/user/add_type_employments', data)
		.then((res) => res.data);
};

const removeTypeEmployementUser = (data: IUpdateTypeEmploymentsRequest): Promise<IUserResponse> => {
	return instance.put('/v1/user/remove_type_employments', data)
		.then((res) => res.data);
};

export {
	getTypeEmployments,
	getTypeEmploymentById,
	addTypeEmployementUser,
	removeTypeEmployementUser,
};
