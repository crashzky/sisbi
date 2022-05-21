import { IPage, UserType } from './common';
import { IEmployer, IUser } from './user';
import { IVacancy } from './vacancies';

type MessageType = 'response' | 'text' | 'picture' | 'voice';

interface IMessage {
	id: number;
	type_message: MessageType;
	content: string | File,
	sender_type: UserType;
	seen: boolean;
	chat_id: number;
	created_at: string;
	updated_at: string;
	sender: IUser | IEmployer;
}

interface IChat {
	id: number;
	created_at: string;
	updated_at: string;
	last_message: IMessage;
	user: IUser;
	employer: IEmployer;
	vacancy: IVacancy;
}

interface IChatRequest {
	page?: number;
}

interface IChatsResponse extends IPage {
	payload: IChat[];
}

interface IChatByIdRequest {
	chat_id: number;
}

interface IChatByIdResponse {
	result_code: 'ok';
	payload: IChat;
}

interface IMessagesRequest {
	chat_id: number;
	page: number;
}

interface IMessagesResponse extends IPage {
	payload: IMessage[];
}

interface ISendMessageRequest {
	message: {
		content: string | File;
		chat_id: number;
		type_message: 0 | 1 | 2 | 3; // response: 0, text: 1, picture: 2, voice: 3
	}
}

interface ISendMessageResponse {
	result_code: 'ok';
	payload: IMessage;
}

export type {
	IChat,
	IMessage,
	IChatRequest,
	IChatsResponse,
	IChatByIdRequest,
	IChatByIdResponse,
	IMessagesResponse,
	IMessagesRequest,
	ISendMessageRequest,
	ISendMessageResponse,
};
