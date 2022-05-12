import { IEmployerResponse, IPutEmployerRequest, IPutUserRequest, IUserResponse } from '../types/api/user';
import instance from './axios';

// User

const getMyProfileUser = (): Promise<IUserResponse> => {
	return instance.get('/v1/user')
		.then((res) => res.data);
};

const putProfileUser = (data: IPutUserRequest): Promise<IUserResponse> => {
	return instance.put('/v1/user', data)
		.then((res) => res.data);
};

const putProlfileFormDataUser = (data: IPutUserRequest): Promise<IUserResponse> => {
	const formData = new FormData();
	Object.keys(data.user).forEach((i) => {
		formData.set(`user[${i}]`, data.user[i]);
	});

	return instance.put('/v1/user', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
		.then((res) => res.data); 
};

// Employer

const getMyProfileEmployer = (): Promise<IEmployerResponse> => {
	return instance.get('/v1/employer/profile')
		.then((res) => res.data);
};

const putProfileEmployer = (data: IPutEmployerRequest): Promise<IEmployerResponse> => {
	return instance.put('/v1/employer/profile', data)
		.then((res) => res.data);
};

const putProlfileFormDataEmployer = (data: IPutEmployerRequest): Promise<IEmployerResponse> => {
	const formData = new FormData();
	Object.keys(data.employer).forEach((i) => {
		formData.set(`employer[${i}]`, data.employer[i]);
	});

	return instance.put('/v1/employer/profile', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
		.then((res) => res.data); 
};

export {
	getMyProfileUser,
	putProfileUser,
	putProlfileFormDataUser,

	getMyProfileEmployer,
	putProfileEmployer,
	putProlfileFormDataEmployer,
};
