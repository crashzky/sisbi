import { ExperienceType, GendersType, IPage } from './common';
import { IUser } from './user';

interface ISearchResumesRequst {
	query?: string;
	salary?: number;
	experience?: ExperienceType;
	gender?: GendersType;
	job_category_id?: string[];
	schedules?: string[];
	employment_types?: string[];
	city?: number;
	page?: number;
}

interface ISearchResumesResponse extends IPage {
	payload: IUser[];
}

interface IResumeByIdResponse {
	result_code: 'ok';
	payload: IUser;
}

export type {
	ISearchResumesRequst,
	ISearchResumesResponse,
	IResumeByIdResponse,
};
