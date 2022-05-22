import { IPage, IRespondStateType } from './common';
import { IChat, IMessage } from './messenger';
import { IEmployer, IUser } from './user';
import { IVacancy } from './vacancies';

interface IInvite {
	id: number;
	state: IRespondStateType;
	created_at: string;
	updated_at: string;
	user: IUser;
	employer: IEmployer;
	message: IMessage;
	vacancy: IVacancy;
	chat: IChat;
}

interface IInviteRequest {
	invite: {
		message: string;
		vacancy_id: number;
		user_id: number;
	}
}

interface IInvitesResponse extends IPage {
	payload: IInvite[];
}

interface IInviteResponse extends IPage {
	payload: IInvite;
}

interface IInviteByIdRequest {
	invite_id: number;
}

export type {
	IInvite,
	IInviteRequest,
	IInvitesResponse,
	IInviteResponse,
	IInviteByIdRequest,
};
