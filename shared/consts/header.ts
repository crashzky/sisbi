import { IHeaderItem } from '../types/header';

const HEADER_LANDING_ITEMS: IHeaderItem[] = [
	{
		title: 'Главная страница',
		href: '#main',
	},
	{
		title: 'Вакансии',
		href: '#vacancies',
	},
	{
		title: 'База резюме',
		href: '#resumes',
	},
	{
		title: 'Мобильное приложение',
		href: '#mobile',
	},
	{
		title: 'Помощь',
		href: '#help',
	},
];

const HEADER_EMPLOYEE_ITEMS: IHeaderItem[] = [
	{
		title: 'Главная страница',
		href: '/',
	},
	{
		title: 'Вакансии',
		href: '/vacancies',
	},
	{
		title: 'Помощь',
		href: '/#help',
	},
];

const HEADER_EMPLOYER_ITEMS: IHeaderItem[] = [
	{
		title: 'Главная страница',
		href: '/',
	},
	{
		title: 'Резюме',
		href: '/resumes',
	},
	{
		title: 'Помощь',
		href: '/#help',
	},
];

export {
	HEADER_LANDING_ITEMS,
	HEADER_EMPLOYEE_ITEMS,
	HEADER_EMPLOYER_ITEMS,
};
