import { IPage } from './common';

interface ISuggest {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
}

interface IGetSuggestsRequest {
	name: string;
}

interface IGetSuggestsResponse extends IPage {
	payload: ISuggest[];
}

interface IGetSuggestByIdRequest {
	id: number;
}

interface IGetSuggestByIdResponse {
	result_code: 'ok';
	payload: ISuggest;
}

export type {
	ISuggest,
	IGetSuggestsRequest,
	IGetSuggestsResponse,
	IGetSuggestByIdRequest,
	IGetSuggestByIdResponse,
};
