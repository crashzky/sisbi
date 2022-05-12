interface ICity {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
}

interface IGetCitiesRequest {
	name: string;
}

interface IGetCitiesResponse {
	result_code: 'ok';
	payload: ICity[];
	current_page: number;
	next_page: number | null;
	total_pages: number;
	total_entries: number;
}

interface IGetCityByIdRequest {
	id: number;
}

interface IGetCityByIdResponse {
	result_code: 'ok';
	payload: ICity;
}

export type {
	ICity,
	IGetCitiesRequest,
	IGetCitiesResponse,
	IGetCityByIdRequest,
	IGetCityByIdResponse,
};
