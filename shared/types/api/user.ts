import { EducationType, EmploymentTypes, ExperienceType, GendersType, UserStatesType } from './common';

interface IUserResponse {
	id: number;
    first_name: string;
    last_name: string;
    surname: string;
    avatar: string;
    birthday: string;
    gender: GendersType;
    experience: ExperienceType;
    type_employment: EmploymentTypes;
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
    schedule: string; //WILL CHANGER
    created_at: string;
    updated_at: string;
    job_category: {
        id: number;
        name: string;
    }
}

interface IPutUserRequest {
	user: Partial<Omit<IUserResponse, 'id'>>;
}

interface IPutUserResponse {
	result_code: 'ok';
	payload: IUserResponse;
}

export type {
	IUserResponse,
	IPutUserRequest,
	IPutUserResponse,
};
