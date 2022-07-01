import { IGetSuggestByIdRequest, IGetSuggestByIdResponse, IGetSuggestsRequest, IGetSuggestsResponse,
} from '../types/api/vacancies_suggestions';
import instance from './axios';

const getSuggestions = (data: IGetSuggestsRequest): Promise<IGetSuggestsResponse> => {
	return instance.get(`/v1/name_vacancies?q[name_cont]=${encodeURI(data.name)}&page=1`)
		.then((res) => res.data);
};

const getSuggestById = (data: IGetSuggestByIdRequest): Promise<IGetSuggestByIdResponse> => {
	return instance.get(`/v1/name_vacancies/${data.id}`)
		.then((res) => res.data);
};

export {
	getSuggestions,
	getSuggestById,
};
