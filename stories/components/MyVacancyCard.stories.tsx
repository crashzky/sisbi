import { ComponentStory, ComponentMeta } from '@storybook/react';

import MyVacancyCard from '../../components/MyVacancyCard';

export default {
	title: 'Components/My Vacancy Card',
	component: MyVacancyCard,
} as ComponentMeta<typeof MyVacancyCard>;

const Template: ComponentStory<typeof MyVacancyCard> = (args) => <MyVacancyCard {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	imageSrc: '/DEV_ONLY.png',
	label: 'UI/UX дизайнер',
	minPrice: 125000,
	description: `Плотно взаимодействовать с командой, и корректировать UI в соответствии с
		возможностями современных технологий. Контролировать реализацию UI/UX в конечном продукте.
		Что ты должен знать/уметь: Ты имеешь опыт работы в сфере мобильных IT продуктов в роли UI/UX.`,
	tags: ['Опыт от 3 лет', 'Полный день', 'Удаленная работа', 'Любой город'],
	last_update: '2022-05-12T21:54:19.769+03:00',
	vacancyId: 1,
};

