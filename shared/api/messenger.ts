import { IChatByIdResponse, IChatRequest, IChatsResponse } from '../types/api/messenger';
import instance from './axios';

const getChats = (data: IChatRequest): Promise<IChatsResponse> => {
	return instance.get('/v1/chats', {
		params: data,
	}).then((res) => res.data);
};

const getChatsEmployer = (data: IChatRequest): Promise<IChatsResponse> => {
	return instance.get('/v1/employer/chats', {
		params: data,
	}).then((res) => res.data);
};

const getChatById = ({ queryKey }): Promise<IChatByIdResponse> => {
	return instance.get(`/v1/chats/${queryKey[0].chat_id}`).then((res) => res.data);
};

const getChatByIdEmployer = ({ queryKey }): Promise<IChatByIdResponse> => {
	return instance.get(`/v1/employer/chats/${queryKey[0].chat_id}`).then((res) => res.data);
};

export {
	getChats,
	getChatById,

	getChatsEmployer,
	getChatByIdEmployer,
};
