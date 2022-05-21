import { IPage } from './common';

interface IJobCategory {
	id: number;
	name: string;
}

interface IJobCategoryByIdRequest {
	id: number;
}

interface IJobCategoriesResult extends IPage {
	payload: IJobCategory[];
}

export type {
	IJobCategory,
	IJobCategoryByIdRequest,
	IJobCategoriesResult,
};
