import { ICity } from './cities';
import { CompanyStatesType, EducationType, ExperienceType, GendersType, UserStatesType } from './common';
import { ISchedule } from './schedules';
import { ITypeEmployment } from './type_employments';

interface IUser {
	id: number;
    first_name: string;
    last_name: string;
    surname: string;
    avatar: string;
    birthday: string;
    gender: GendersType;
    experience: ExperienceType;
    type_employments: ITypeEmployment[];
    city: ICity | null;
    state: UserStatesType;
    skills: string;
	visible: boolean;
    phone: number;
    email: string | null;
    about: string | null;
    min_salary: number;
    ready_mission: boolean;
    ready_move: boolean;
    driving_license: string;
    education: EducationType;
    previous_job: string;
    views: number;
	is_favorite: boolean;
	shows: number;
    schedules: ISchedule[];
    created_at: string;
    updated_at: string;
    job_category: {
        id: number;
        name: string;
    };
}

interface IUserResponse {
	result_code: 'ok';
	payload: IUser;
}

interface IEmployer {
	id: number;
	name: string;
	about: string;
	email: string;
	avatar: string;
	created_at: string;
	updated_at: string;
	phone: string;
	state: CompanyStatesType;
}

interface IEmployerResponse {
	result_code: 'ok';
	payload: IEmployer;
}

interface IUserRequestFields {
	job_category_id?: number;
	city_id?: number;
}

interface IPutUserRequest {
	user: Partial<Omit<IUser, 'id'>> & IUserRequestFields;
}

interface IPutEmployerRequest {
	employer: Partial<Omit<IEmployer, 'id'>>;
}

interface IStatsEmployer {
	result_code: 'ok';
	payload: {
		vacancies_shows_sum: number;
		vacancies_views_sum: number;
		responses_count: number;
		invites_count: number;
	};
}

export type {
	IUser,
	IUserResponse,
	IPutUserRequest,

	IEmployer,
	IPutEmployerRequest,
	IEmployerResponse,
	IStatsEmployer,
};
