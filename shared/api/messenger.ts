import { IChatByIdResponse, IChatRequest, IChatsResponse, IMessagesRequest, IMessagesResponse, ISendMessageRequest,
	ISendMessageResponse } from '../types/api/messenger';
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

const getMessages = (data: IMessagesRequest): Promise<IMessagesResponse> => {
	return instance.get(`/v1/messages/${data.chat_id}`, {
		params: {
			page: data.page,
		},
	})
		.then((res) => res.data);
};

const getMessagesEmployer = (data: IMessagesRequest): Promise<IMessagesResponse> => {
	return instance.get(`/v1/employer/messages/${data.chat_id}`, {
		params: {
			page: data.page,
		},
	})
		.then((res) => res.data);
};

const sendMessage = (data: ISendMessageRequest): Promise<ISendMessageResponse> => {
	return instance.post('/v1/messages', data)
		.then((res) => res.data);
};

const sendMessageEmployer = (data: ISendMessageRequest): Promise<ISendMessageResponse> => {
	return instance.post('/v1/employer/messages', data)
		.then((res) => res.data);
};

export {
	getChats,
	getChatById,
	getMessages,
	sendMessage,

	getChatsEmployer,
	getChatByIdEmployer,
	getMessagesEmployer,
	sendMessageEmployer,
};
