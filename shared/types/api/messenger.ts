import { UserType } from './common';
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

interface IChatsResponse {
	result_code: 'ok';
	payload: IChat[];
	current_page: number;
	next_page: number | null;
	total_pages: number;
	total_entries: number;
}

interface IChatByIdRequest {
	chat_id: number;
}

interface IChatByIdResponse {
	result_code: 'ok';
	payload: IChat;
}

export type {
	IChat,
	IMessage,
	IChatRequest,
	IChatsResponse,
	IChatByIdRequest,
	IChatByIdResponse,
};
