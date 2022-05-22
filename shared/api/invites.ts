import { IInviteByIdRequest, IInviteRequest, IInviteResponse, IInvitesResponse } from '../types/api/invites';
import instance from './axios';

const getInvites = (): Promise<IInvitesResponse> => {
	return instance.get('/v1/invites')
		.then((res) => res.data);
};

const getInvitesEmployer = (): Promise<IInvitesResponse> => {
	return instance.get('/v1/employer/invites')
		.then((res) => res.data);
};

const getInviteById = (data: IInviteByIdRequest): Promise<IInviteResponse> => {
	return instance.get(`/v1/invites/${data.invite_id}`)
		.then((res) => res.data);
};

const getInviteByIdEmployer = (data: IInviteByIdRequest): Promise<IInviteResponse> => {
	return instance.get(`/v1/employer/invites/${data.invite_id}`)
		.then((res) => res.data);
};

const acceptInvite = (data: IInviteByIdRequest): Promise<IInviteResponse> => {
	return instance.put(`/v1/invites/${data.invite_id}/accept`)
		.then((res) => res.data);
};

const declineInvite = (data: IInviteByIdRequest): Promise<IInviteResponse> => {
	return instance.put(`/v1/invites/${data.invite_id}/decline`)
		.then((res) => res.data);
};

const createInvite = (data: IInviteRequest): Promise<IInviteResponse> => {
	return instance.post('/v1/employer/invites', data)
		.then((res) => res.data);
};

export {
	getInvites,
	getInvitesEmployer,
	getInviteById,
	getInviteByIdEmployer,
	acceptInvite,
	declineInvite,
	createInvite,
};
