import { EXPERIENCE } from '../consts/profile';
import { ICreateVacancyRequest, ICreateVacancyResponse, IPutVacncyRequest, IUpdateSchedulesRequest,
	IUpdateTypeEmployementsRequest, IVacanciesRequest, IVacanciesResponse } from '../types/api/vacancies';
import instance from './axios';

const getVacancies = (data: IVacanciesRequest): Promise<IVacanciesResponse> => {
	let params = [];

	const EXPRERIENCE_ITEMS = Object.keys(EXPERIENCE);

	if(data.query)
		params.push(`q[description_or_title_cont]=${data.query}`);
	if(data.city_id)
		params.push(`q[city_id_eq]=${data.city_id}`);
	if(data.salary)
		params.push(`q[salary_gteq]=${data.salary}`);
	if(data.experience)
		params.push(`q[experience_eq]=${EXPRERIENCE_ITEMS.indexOf(data.experience)}`);
		
	if(data.job_category_id && data.job_category_id[0] !== '[]') {
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

	return instance.get(`/v1/vacancies?${params.join('&')}`)
		.then((res) => res.data);
};

const getVacancyById = ({ queryKey }): Promise<IVacanciesResponse> => {
	return instance.get(`/v1/vacancies?q[id_eq]=${queryKey[0].id}`)
		.then((res) => res.data);
};

const getRecentVacancies = (): Promise<IVacanciesResponse> => {
	return instance.get('/v1/vacancies/order_desc?limit=3')
		.then((res) => res.data);
};

const getMyVacancies = ({ queryKey }): Promise<IVacanciesResponse> => {
	return instance.get('/v1/employer/vacancies', {
		params: queryKey[0].page ? { page: queryKey[0].page } : {},
	}).then((res) => res.data);
};

const createVacancy = (data: ICreateVacancyRequest): Promise<ICreateVacancyResponse> => {
	const formData = new FormData();
	Object.keys(data).forEach((i) => {
		formData.set(`vacancy[${i}]`, data[i]);
	});

	return instance.post('/v1/employer/vacancies', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
		.then((res) => res.data); 
};

const putVacancy = (data: IPutVacncyRequest): Promise<ICreateVacancyResponse> => {
	const formData = new FormData();
	Object.keys(data).forEach((i) => {
		formData.set(`vacancy[${i}]`, data[i]);
	});

	return instance.put(`/v1/employer/vacancies/${data.id}`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
		.then((res) => res.data); 
};

const addSchedulesVacancy = (data: IUpdateSchedulesRequest): Promise<ICreateVacancyResponse> => {
	return instance.put(`/v1/employer/vacancies/${data.id}/add_schedules`, { schedules: data.schedules })
		.then((res) => res.data);
};

const removeSchedulesVacancy = (data: IUpdateSchedulesRequest): Promise<ICreateVacancyResponse> => {
	return instance.put(`/v1/employer/vacancies/${data.id}/remove_schedules`, { schedules: data.schedules })
		.then((res) => res.data);
};

const addTypeEmployementsVacancy = (data: IUpdateTypeEmployementsRequest): Promise<ICreateVacancyResponse> => {
	return instance.put(`/v1/employer/vacancies/${data.id}/add_type_employments`, { type_employments: data.type_employments })
		.then((res) => res.data);
};

const removeTypeEmployementsVacancy = (data: IUpdateTypeEmployementsRequest): Promise<ICreateVacancyResponse> => {
	return instance.put(`/v1/employer/vacancies/${data.id}/remove_type_employments`, { type_employments: data.type_employments })
		.then((res) => res.data);
};

export {
	getVacancies,
	getVacancyById,
	getRecentVacancies,
	createVacancy,
	getMyVacancies,
	putVacancy,

	addSchedulesVacancy,
	removeSchedulesVacancy,
	addTypeEmployementsVacancy,
	removeTypeEmployementsVacancy,
};
