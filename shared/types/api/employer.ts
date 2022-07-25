import { IEmployer } from './user';

type IGetEmployerQueryKey = [
	{
		id: number,
	},
	'get_employer',
];

interface IGetEmployerRequest {
	queryKey: IGetEmployerQueryKey,
}

interface IGetEmployerResponse {
	result_code: 'ok';
	payload: IEmployer;
}

export type {
	IGetEmployerQueryKey,
	IGetEmployerRequest,
	IGetEmployerResponse,
};
