import { IPage } from './common';
import { IVacancy } from './vacancies';

interface IFavoriteVacanciesRequest {
	page: number;
}

interface IFavoriteVacanciesResponse extends IPage {
	payload: IVacancy[];
}

interface IFavoriteVacancyRequet {
	favorite_vacancy_id: number;
}

interface IFavoriteVacancyResponse extends IPage {
	payload: IVacancy;
}

interface IAddVacancyToFavoriteRequest {
	vacancy_id: number;
}

interface IRemoveVacancyByFavoritesRequest {
	favorite_vacancy_id: number;
}

export type {
	IFavoriteVacanciesRequest,
	IFavoriteVacanciesResponse,

	IFavoriteVacancyRequet,
	IFavoriteVacancyResponse,

	IAddVacancyToFavoriteRequest,
	IRemoveVacancyByFavoritesRequest,
};
