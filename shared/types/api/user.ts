import { EducationType, ExperienceType, GendersType, UserStatesType } from './common';
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
    city: string;
    state: UserStatesType;
    skills: string;
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
}

interface IEmployerResponse {
	result_code: 'ok';
	payload: IEmployer;
}

interface IUserRequestFields {
	job_category_id?: number;
}

interface IPutUserRequest {
	user: Partial<Omit<IUser, 'id'>> & IUserRequestFields;
}

interface IPutEmployerRequest {
	employer: Partial<Omit<IEmployerResponse, 'id'>>;
}

export type {
	IUserResponse,
	IPutUserRequest,

	IPutEmployerRequest,
	IEmployerResponse,
};
