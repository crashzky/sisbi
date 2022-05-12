import { ICity } from './cities';
import { ExperienceType, VacancyStatesType } from './common';
import { IJobCategory } from './job_categories';
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
	created_at: string;
	updated_at: string;
	job_category: IJobCategory;
	schedules: ISchedule[];
	type_employments: ITypeEmployment[];
	employer: IEmployer;
	city: ICity | null;
}

interface IVacanciesRequest {
	title?: string;
	salary?: number;
	experience?: ExperienceType;
	page?: number;
}

interface IVacanciesResponse {
	result_code: 'ok';
	payload: IVacancy[];
	current_page: number;
	next_page: number | null;
	total_pages: number;
	total_entries: number;
}

export type {
	IVacancy,
	IVacanciesRequest,
	IVacanciesResponse,
};
