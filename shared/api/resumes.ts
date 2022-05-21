import { EXPERIENCE } from '../consts/profile';
import { IResumeByIdResponse, ISearchResumesRequst, ISearchResumesResponse } from '../types/api/resumes';
import instance from './axios';

const getResumes = (data: ISearchResumesRequst): Promise<ISearchResumesResponse> => {
	let params = [];

	const EXPRERIENCE_ITEMS = Object.keys(EXPERIENCE);

	if(data.query)
		params.push(`q[previous_job_i_cont]=${data.query}`);
	if(data.city)
		params.push(`q[city_id_eq]=${data.city}`);
	if(data.salary)
		params.push(`q[min_salary_gteq]=${data.salary}`);
	if(data.gender)
		params.push(`q[gender_eq]=${data.gender}`);
	if(data.experience)
		params.push(`q[experience_eq]=${EXPRERIENCE_ITEMS.indexOf(data.experience)}`);
		
	if(data.job_category_id) {
		data.job_category_id.forEach((i) => {
			params.push(`q[job_category_id_in][]=${i}`);
		});
	}
	if(data.employment_types) {
		data.employment_types.forEach((i) => {
			params.push(`q[type_employments_id_in][]=${i}`);
		});
	}
	if(data.schedules) {
		data.schedules.forEach((i) => {
			params.push(`q[schedules_id_in][]=${i}`);
		});
	}
	if(data.page)
		params.push(`page=${data.page}`);

	return instance.get(`/v1/employer/users?${params.join('&')}`)
		.then((res) => res.data);
};

const getResumeById = ({ queryKey }): Promise<IResumeByIdResponse> => {
	return instance.get(`/v1/employer/users/${queryKey[0].id}`)
		.then((res) => res.data);
};

export {
	getResumes,
	getResumeById,
};
