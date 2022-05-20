type GendersType = 'male' | 'female';
type UserStatesType = 'active' | 'moderating' | 'created' | 'deactivated';
type VacancyStatesType = 'active' | 'moderating' | 'deactivated';
type IRespondStateType = 'created' | 'accepted' | 'declined';
type CompanyStatesType = 'active' | 'moderating' | 'created' | 'deactivated';
type EmploymentTypes = 'internship' | 'project_work' | 'part_time' | 'full';
type EducationType = 'secondary' | 'secondary_special' | 'incomplete_higher' | 'higher' | 'bachelor' | 'master'
	| 'candidate' | 'doctor';
type ExperienceType = 'no' | 'y_1_3' | 'y_2_6' | 'more_6';
type UserType = 'User' | 'Employer';
 
interface ICommonResponse {
	result_code: 'ok';
	payload: {
		status: boolean;
	}
}

interface ICommonResponseError {
	messages: string[];
	errors: {
		error: string;
	}
}

export type {
	GendersType,
	UserStatesType,
	EmploymentTypes,
	ICommonResponse,
	ICommonResponseError,
	EducationType,
	ExperienceType,
	VacancyStatesType,
	IRespondStateType,
	CompanyStatesType,
	UserType,
};
