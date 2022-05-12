import { IGetCitiesRequest, IGetCitiesResponse, IGetCityByIdRequest, IGetCityByIdResponse } from '../types/api/cities';
import instance from './axios';

const getCities = (data: IGetCitiesRequest): Promise<IGetCitiesResponse> => {
	return instance.get(`/v1/cities?q[name_cont]=${encodeURI(data.name)}&page=1`)
		.then((res) => res.data);
};

const getCityById = (data: IGetCityByIdRequest): Promise<IGetCityByIdResponse> => {
	return instance.get(`/v1/cities/${data.id}`)
		.then((res) => res.data);
};

export {
	getCities,
	getCityById,
};
