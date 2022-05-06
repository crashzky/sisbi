import { IJobCategory, IJobCategoryByIdRequest } from '../types/api/job_categories';
import instance from './axios';

const getJobCategories = (): Promise<IJobCategory[]> => {
	return instance.get('/v1/job_categories')
		.then((res) => res.data);
};

const getJobCategoryById = (data: IJobCategoryByIdRequest): Promise<IJobCategory> => {
	return instance.get(`/v1/job_categories/${data.id}`)
		.then((res) => res.data);
};

export {
	getJobCategories,
	getJobCategoryById,
};
