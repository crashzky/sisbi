import { IFooterItem } from '../types/footer';

const FOOTER_ITEMS: IFooterItem[] = [
	{
		title: 'Соискателям',
		items: [
			{
				title: 'Вход',
				href: '/#login',
			},
			{
				title: 'Регистрация',
				href: '/#signup',
			},
			{
				title: 'Вакансии',
				href: '/vacancies',
				
			},
			{
				title: 'Вопрос-ответ',
				href: '/#help',
			},
		],
	},
	{
		title: 'Работодателям',
		items: [
			{
				title: 'Вход',
				href: '/#login',
			},
			{
				title: 'Регистрация',
				href: '/#signup',
			},
			{
				title: 'База резюме',
				href: '/resumes',
				
			},
			{
				title: 'Вопрос-ответ',
				href: '/#help',
			},
		],
	},
	{
		title: 'SISBI',
		items: [
			{
				title: 'Главная страница',
				href: '/',
			},
			{
				title: 'Политика',
				href: '/policy.pdf',
			},
			{
				title: 'Контакты',
				href: '#',
				
			},
			{
				title: 'Мобильное приложение',
				href: '/#mobile',
			},
		],
	},
];

export {
	FOOTER_ITEMS,
};
