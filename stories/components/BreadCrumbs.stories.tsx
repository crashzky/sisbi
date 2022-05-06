import { ComponentStory, ComponentMeta } from '@storybook/react';

import BreadCrumbs from '../../components/BreadCrumbs';

export default {
	title: 'Components/Bread Crumbs',
	component: BreadCrumbs,
} as ComponentMeta<typeof BreadCrumbs>;

const Template: ComponentStory<typeof BreadCrumbs> = (args) => <BreadCrumbs {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	items: [
		{
			label: 'Вакансии',
			href: '/vanacies',
		},
		{
			label: 'UI/UX дизайнер',
			href: '/vanacies/1',
		},
	],
};

