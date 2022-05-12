import { ComponentStory, ComponentMeta } from '@storybook/react';
import NewVacancyPage from '../../pages/my_vacancies/new';

export default {
	title: 'Pages/New vacancy',
	component: NewVacancyPage,
} as ComponentMeta<typeof NewVacancyPage>;

export const Primary: ComponentStory<typeof NewVacancyPage> = () => <NewVacancyPage />;
