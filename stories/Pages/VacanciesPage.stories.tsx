import { ComponentStory, ComponentMeta } from '@storybook/react';
import VacanciesPage from '../../pages/vacancies';

export default {
	title: 'Pages/Vacancies',
	component: VacanciesPage,
} as ComponentMeta<typeof VacanciesPage>;

export const Primary: ComponentStory<typeof VacanciesPage> = () => <VacanciesPage />;
