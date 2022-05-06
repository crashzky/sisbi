import { ComponentStory, ComponentMeta } from '@storybook/react';

import RespondVacancyMenu from '../../components/RespondVacancyMenu';

export default {
	title: 'Components/Respond Vacancy Menu',
	component: RespondVacancyMenu,
} as ComponentMeta<typeof RespondVacancyMenu>;

const Template: ComponentStory<typeof RespondVacancyMenu> = (args) => <RespondVacancyMenu {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	companyName: 'Jungu Digital',
	vacancyName: 'UI/UX дизайнер',
	vacancyId: 1,
	minPrice: 125000,
	contactName: 'Мария соколова',
	contactPhone: 9139822927,
	conactPhone: 'mail@mail.ru',
	onContinue: () => console.log('continue'),
	onBack: () => console.log('back'),
};

