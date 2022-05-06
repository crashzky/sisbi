import { ComponentStory, ComponentMeta } from '@storybook/react';
import VacancyPage from '../../pages/vacancies/[id]';

export default {
	title: 'Pages/Vacancy',
	component: VacancyPage,
} as ComponentMeta<typeof VacancyPage>;

export const Primary: ComponentStory<typeof VacancyPage> = () => <VacancyPage />;
