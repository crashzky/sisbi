import { ComponentStory, ComponentMeta } from '@storybook/react';

import ShortVacancyCard from '../../components/ShortVacancyCard';

export default {
	title: 'Components/Short Vacancy Card',
	component: ShortVacancyCard,
} as ComponentMeta<typeof ShortVacancyCard>;

const Template: ComponentStory<typeof ShortVacancyCard> = (args) => <ShortVacancyCard {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	lastUpdate: new Date(Date.now()),
	label: 'Junior UI/UX дизайнер',
	minPrice: 125000,
	description: `Плотно взаимодействовать с командой, и корректировать UI в соответствии с
	возможностями современных технологий. Контролировать реализацию UI/UX, быть ответственным за сдачу проекта в срок.`,
	tags: ['Опыт от 3 лет', 'Полный день', 'Удаленная работа', 'Любой город'],
};

