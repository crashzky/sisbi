import { ISchedule, IScheduleByIdRequest, ISchedulesResponse, IUpdateShedulesRequest } from '../types/api/schedules';
import { IUserResponse } from '../types/api/user';
import instance from './axios';

const getSchedules = (): Promise<ISchedulesResponse> => {
	return instance.get('/v1/schedules')
		.then((res) => res.data);
};

const getScheduleById = (data: IScheduleByIdRequest): Promise<ISchedule> => {
	return instance.get(`/v1/schedules/${data.id}`)
		.then((res) => res.data);
};

const addSchedulesUser = (data: IUpdateShedulesRequest): Promise<IUserResponse> => {
	return instance.put('/v1/user/add_schedules', data)
		.then((res) => res.data);
};

const removeSchedulesUser = (data: IUpdateShedulesRequest): Promise<IUserResponse> => {
	return instance.put('/v1/user/remove_schedules', data)
		.then((res) => res.data);
};

export {
	getSchedules,
	getScheduleById,
	addSchedulesUser,
	removeSchedulesUser,	
};
