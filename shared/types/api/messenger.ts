import { IPage, UserType } from './common';
import { IInvite } from './invites';
import { IEmployer, IUser } from './user';
import { IResponse, IVacancy } from './vacancies';

type MessageType = 'response' | 'text' | 'picture' | 'voice' | 'invite';

interface IMessage {
	id: number;
	type_message: MessageType;
	content: string | File,
	sender_type: UserType;
	seen: boolean;
	chat_id: number;
	created_at: string;
	updated_at: string;
	seen_at: string | null;
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
	last_response?: IResponse;
	last_invite?: IInvite;
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
		type_message: 0 | 1 | 2 | 3; // response: 0, text: 1, picture: 2, voice: 3, invite: 4
	}
}

interface ISendMessageResponse {
	result_code: 'ok';
	payload: IMessage;
}

export type {
	MessageType,
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
