import { ICity } from './cities';
import { ExperienceType, IPage, IRespondStateType, VacancyStatesType } from './common';
import { IJobCategory } from './job_categories';
import { IChat, IMessage } from './messenger';
import { ISchedule } from './schedules';
import { ITypeEmployment } from './type_employments';
import { IEmployer } from './user';

interface IVacancy {
	id: number;
	title: string;
	description: string;
	full_name: string;
	avatar: string | null;
	phone: string;
	email: string;
	experience: ExperienceType;
	state: VacancyStatesType;
	salary: number;
	views: number;
	shows: number;
	visible: boolean;
	created_at: string;
	updated_at: string;
	job_category: IJobCategory;
	schedules: ISchedule[];
	type_employments: ITypeEmployment[];
	employer: IEmployer;
	city: ICity | null;
}

interface IVacanciesRequest {
	query?: string;
	salary?: number;
	experience?: ExperienceType;
	job_category_id?: string[];
	schedules?: string[];
	employment_types?: string[];
	city?: number;
	page?: number;
}

interface IVacanciesResponse extends IPage {
	payload: IVacancy[];
}

interface IVacancyResponse {
	result_code: 'ok';
	payload: IVacancy;
}

interface ICreateVacancyRequest {
	avatar?: File;
	title: string;
	job_category_id: number;
	salary: number;
	experience: ExperienceType;
	description: string;
	full_name: string;
	phone: string;
	visible?: boolean;
	email: string;
	city_id: number;
}

interface IPutVacncyRequest extends Partial<ICreateVacancyRequest> {
	id: number;
}

interface IDeleteVacancyRequest {
	id: number;
}

interface ICreateVacancyResponse {
	result_code: 'ok';
	payload: IVacancy;	
}

interface IUpdateSchedulesRequest {
	id: number;
	schedules: number[];
}

interface IUpdateTypeEmployementsRequest {
	id: number;
	type_employments: number[];
}

interface IRespondVacancyRequest {
	response: {
		message: string;
		vacancy_id: number;
	};
}

interface IRespondVacancyResponse {
	result_code: 'ok';
	payload: IVacancyRespond;
}

interface IVacancyRespond extends IChat {
	state: IRespondStateType;
	message: IMessage;
	chat: {
		id: number;
		created_at: string;
		updated_at: string;
		last_message: IMessage;
	}
}

export type {
	IVacancy,
	IVacanciesRequest,
	IVacancyResponse,
	IVacanciesResponse,
	ICreateVacancyRequest,
	ICreateVacancyResponse,
	IUpdateSchedulesRequest,
	IUpdateTypeEmployementsRequest,
	IPutVacncyRequest,
	IRespondVacancyRequest,
	IRespondVacancyResponse,
	IDeleteVacancyRequest,
};
