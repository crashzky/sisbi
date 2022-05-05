import { ITypeEmployment, ITypeEmploymentByIdRequest } from '../types/api/type_employments';
import instance from './axios';

const getTypeEmployments = (): Promise<ITypeEmployment[]> => {
	return instance.get('/v1/type_employments')
		.then((res) => res.data);
};

const getTypeEmploymentById = (data: ITypeEmploymentByIdRequest): Promise<ITypeEmployment> => {
	return instance.get(`/v1/type_employments/${data.id}`)
		.then((res) => res.data);
};

export {
	getTypeEmployments,
	getTypeEmploymentById,
};
