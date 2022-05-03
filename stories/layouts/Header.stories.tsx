import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from '../../layouts/Header';
import { HEADER_LANDING_ITEMS, HEADER_PRIMARY_ITEMS } from '../../shared/consts/header';

export default {
	title: 'Layouts/Header',
	component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Primary = Template.bind({});

export const Landing = Template.bind({});

Landing.args = {
	items: HEADER_LANDING_ITEMS,
};

Primary.args = {
	items: HEADER_PRIMARY_ITEMS,
};
