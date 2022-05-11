interface IJobCategory {
	id: number;
	name: string;
}

interface IJobCategoryByIdRequest {
	id: number;
}

interface IJobCategoriesResult {
	current_page: number;
	next_page: number | null;
	payload: IJobCategory[];
	result_code: 'ok';
	total_entries: number;
	total_pages: number;
}

export type {
	IJobCategory,
	IJobCategoryByIdRequest,
	IJobCategoriesResult,
};
