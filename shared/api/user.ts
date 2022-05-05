import { IPutUserRequest, IPutUserResponse, IUserResponse } from '../types/api/user';
import instance from './axios';

const getMyProfile = (): Promise<IUserResponse> => {
	return instance.get('/v1/user')
		.then((res) => res.data);
};

const putProfile = (data: IPutUserRequest): Promise<IPutUserResponse> => {
	return instance.put('/v1/user', data)
		.then((res) => res.data);
};

export {
	getMyProfile,
	putProfile,
};
