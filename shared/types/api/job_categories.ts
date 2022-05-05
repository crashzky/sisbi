interface IJobCategory {
	id: number;
	name: string;
}

interface IJobCategoryByIdRequest {
	id: number;
}

export type {
	IJobCategory,
	IJobCategoryByIdRequest,
};
