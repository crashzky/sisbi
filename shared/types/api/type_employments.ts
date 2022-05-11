interface ITypeEmployment {
	id: number;
	name: string;
}

interface ITypeEmploymentByIdRequest {
	id: number;
}

interface ITypeEmploymentResponse {
	current_page: number;
	next_page: number | null;
	payload: ITypeEmployment[];
	result_code: 'ok';
	total_entries: number;
	total_pages: number;
}

interface IUpdateTypeEmploymentsRequest {
	type_employments: number[];
}

export type {
	ITypeEmployment,
	ITypeEmploymentByIdRequest,
	ITypeEmploymentResponse,
	IUpdateTypeEmploymentsRequest,
};
