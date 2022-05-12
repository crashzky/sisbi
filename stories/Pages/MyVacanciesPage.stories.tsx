import { ComponentStory, ComponentMeta } from '@storybook/react';
import MyVacanciesPage from '../../pages/my_vacancies';

export default {
	title: 'Pages/My Vacancies',
	component: MyVacanciesPage,
} as ComponentMeta<typeof MyVacanciesPage>;

export const Primary: ComponentStory<typeof MyVacanciesPage> = () => <MyVacanciesPage />;
