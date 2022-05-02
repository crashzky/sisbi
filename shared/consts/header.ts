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

const HEADER_PRIMARY_ITEMS: IHeaderItem[] = [
	{
		title: 'Главная страница',
		href: '/',
	},
	{
		title: 'Вакансии',
		href: '/vacancies',
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
	HEADER_PRIMARY_ITEMS,
};
