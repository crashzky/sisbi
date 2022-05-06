import { ComponentStory, ComponentMeta } from '@storybook/react';

import VacancyCard from '../../components/VacancyCard';

export default {
	title: 'Components/Vacancy Card',
	component: VacancyCard,
} as ComponentMeta<typeof VacancyCard>;

const Template: ComponentStory<typeof VacancyCard> = (args) => <VacancyCard {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	imageSrc: '/DEV_ONLY.png',
	companyName: 'Jungu Digital',
	label: 'UI/UX дизайнер',
	minPrice: 125000,
	description: `Плотно взаимодействовать с командой, и корректировать UI в соответствии с
		возможностями современных технологий. Контролировать реализацию UI/UX в конечном продукте.
		Что ты должен знать/уметь: Ты имеешь опыт работы в сфере мобильных IT продуктов в роли UI/UX.`,
	tags: ['Опыт от 3 лет', 'Полный день', 'Удаленная работа', 'Любой город'],
	
	contactName: 'Мария соколова',
	contactPhone: 9139822927,
	conactPhone: 'mail@mail.ru',
	onRespond: () => console.log('open'),
};

