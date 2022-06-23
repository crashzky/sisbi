import { IPage } from './common';
import { IUser } from './user';

interface IFavoriteUsersRequest {
	page: number;
}

interface IFavoriteUsersResponse extends IPage {
	payload: IUser[];
}

interface IFavoriteUserRequet {
	favorite_user_id: number;
}

interface IFavoriteUserResponse extends IPage {
	payload: IUser;
}

interface IAddUserToFavoriteRequest {
	user_id: number;
}

interface IRemoveUserFromFavoritesRequest {
	favorite_user_id: number;
}

export type {
	IFavoriteUsersRequest,
	IFavoriteUsersResponse,

	IFavoriteUserRequet,
	IFavoriteUserResponse,

	IAddUserToFavoriteRequest,
	IRemoveUserFromFavoritesRequest,
};
