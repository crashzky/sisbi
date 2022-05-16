import { ComponentStory, ComponentMeta } from '@storybook/react';

import ResumeCard from '../../components/ResumeCard';

export default {
	title: 'Components/Resume Card',
	component: ResumeCard,
} as ComponentMeta<typeof ResumeCard>;

const Template: ComponentStory<typeof ResumeCard> = (args) => <ResumeCard {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	avatar: '/DEV_ONLY.png',
	name: 'Алексей',
	surname: 'Сухоруков',
	birthday: new Date(2022, 1, 18),
	city: 'Екатеринубрг',
	minSalary: 125000,
	vacancyName: 'UI/UX дизайнер',
	skills: ['Figma', 'Photoshop', 'Web-дизайн', 'iOS'],
	about: `Плотно взаимодействовать с командой, и корректировать UI в соответствии с
		возможностями современных технологий. Контролировать реализацию UI/UX в конечном продукте.
		Что ты должен знать/уметь: Ты имеешь опыт работы в сфере мобильных IT продуктов в роли UI/UX.`,
	tags: ['Опыт от 3 лет', 'Полный день', 'Удаленная работа', 'Любой город'],
	onRespond: () => {},
};

