import { IPage } from './common';

interface ICity {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
}

interface IGetCitiesRequest {
	name: string;
}

interface IGetCitiesResponse extends IPage {
	payload: ICity[];
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
