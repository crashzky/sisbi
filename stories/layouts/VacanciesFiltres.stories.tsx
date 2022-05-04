import { ComponentStory, ComponentMeta } from '@storybook/react';

import VacanciesFiltres from '../../layouts/VacanciesFiltres';

export default {
	title: 'Layouts/Vacancies Filtres',
	component: VacanciesFiltres,
} as ComponentMeta<typeof VacanciesFiltres>;

const Template: ComponentStory<typeof VacanciesFiltres> = (args) => <VacanciesFiltres {...args} />;

export const Primary = Template.bind({});
