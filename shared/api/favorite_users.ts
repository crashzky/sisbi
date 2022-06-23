import { IAddUserToFavoriteRequest, IFavoriteUserRequet, IFavoriteUserResponse, IFavoriteUsersResponse,
	IRemoveUserFromFavoritesRequest } from '../types/api/favorite_users';
import axios from './axios';

const getFavoriteUsers = ({ queryKey }): Promise<IFavoriteUsersResponse> => {
	return axios.get('/v1/employer/favorite_users', {
		params: queryKey[0],
	}).then((res) => res.data);
};

const getFavoriteUserById = (data: IFavoriteUserRequet): Promise<IFavoriteUserResponse> => {
	return axios.get(`v1/employer/favorite_users/${data.favorite_user_id}`)
		.then((res) => res.data);
};

const addUserToFavorite = (data: IAddUserToFavoriteRequest): Promise<IFavoriteUserResponse> => {
	return axios.post('v1/employer/favorite_users/', {
		favorite_user: data,
	})
		.then((res) => res.data);
};

const removeUserFromFavorites = (data: IRemoveUserFromFavoritesRequest): Promise<null> => {
	return axios.delete(`v1/employer/favorite_users/${data.favorite_user_id}`).then((res) => res.data);
};

export {
	getFavoriteUsers,
	getFavoriteUserById,
	addUserToFavorite,
	removeUserFromFavorites,
};
