import axios from './axios';
import { IAddVacancyToFavoriteRequest, IFavoriteVacanciesResponse, IFavoriteVacancyRequet,
	IFavoriteVacancyResponse, 
	IRemoveVacancyByFavoritesRequest } from '../types/api/favorites';

const getFavoriteVacancies = ({ queryKey }): Promise<IFavoriteVacanciesResponse> => {
	return axios.get('/v1/favorite_vacancies', {
		params: queryKey[0],
	}).then((res) => res.data);
};

const getFavoriteVacancyById = (data: IFavoriteVacancyRequet): Promise<IFavoriteVacancyResponse> => {
	return axios.get(`v1/favorite_vacancies/${data.favorite_vacancy_id}`)
		.then((res) => res.data);
};

const addVacancyToFavorite = (data: IAddVacancyToFavoriteRequest): Promise<IFavoriteVacancyResponse> => {
	return axios.post('v1/favorite_vacancies/', {
		favorite_vacancy: data,
	})
		.then((res) => res.data);
};

const removeVacancyFromFavorites = (data: IRemoveVacancyByFavoritesRequest): Promise<null> => {
	return axios.delete(`v1/favorite_vacancies/${data.favorite_vacancy_id}`).then((res) => res.data);
};

export {
	getFavoriteVacancies,
	getFavoriteVacancyById,
	addVacancyToFavorite,
	removeVacancyFromFavorites,
};
