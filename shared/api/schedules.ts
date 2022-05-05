import { ISchedule, IScheduleByIdRequest } from '../types/api/schedules';
import instance from './axios';

const getSchedules = (): Promise<ISchedule[]> => {
	return instance.get('/v1/schedules')
		.then((res) => res.data);
};

const getScheduleById = (data: IScheduleByIdRequest): Promise<ISchedule> => {
	return instance.get(`/v1/schedules/${data.id}`)
		.then((res) => res.data);
};

export {
	getSchedules,
	getScheduleById,
};
