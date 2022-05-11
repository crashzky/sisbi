interface ISchedule {
	id: number;
	name: string;
}

interface IScheduleByIdRequest {
	id: number;
}

interface ISchedulesResponse {
	current_page: number;
	next_page: number | null;
	payload: ISchedule[];
	result_code: 'ok';
	total_entries: number;
	total_pages: number;
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
