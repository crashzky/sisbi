interface ISchedule {
	id: number;
	name: string;
}

interface IScheduleByIdRequest {
	id: number;
}

export type {
	ISchedule,
	IScheduleByIdRequest,
};
