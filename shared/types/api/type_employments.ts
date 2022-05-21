import { IPage } from './common';

interface ITypeEmployment {
	id: number;
	name: string;
}

interface ITypeEmploymentByIdRequest {
	id: number;
}

interface ITypeEmploymentResponse extends IPage {
	payload: ITypeEmployment[];
}

interface IUpdateTypeEmploymentsRequest {
	type_employments: number[];
}

export type {
	ITypeEmployment,
	ITypeEmploymentByIdRequest,
	ITypeEmploymentResponse,
	IUpdateTypeEmploymentsRequest,
};
