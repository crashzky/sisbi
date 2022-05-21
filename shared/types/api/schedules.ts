import { IPage } from './common';

interface ISchedule {
	id: number;
	name: string;
}

interface IScheduleByIdRequest {
	id: number;
}

interface ISchedulesResponse extends IPage {
	payload: ISchedule[];
}

interface IUpdateShedulesRequest {
	schedules: number[];
}

export type {
	ISchedule,
	IScheduleByIdRequest,
	ISchedulesResponse,
	IUpdateShedulesRequest,
};
