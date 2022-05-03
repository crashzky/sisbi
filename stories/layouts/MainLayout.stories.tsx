import { ComponentStory, ComponentMeta } from '@storybook/react';

import MainLayout from '../../layouts/MainLayout';
import { HEADER_PRIMARY_ITEMS } from '../../shared/consts/header';

export default {
	title: 'Layouts/Main Layout',
	component: MainLayout,
} as ComponentMeta<typeof MainLayout>;

const Template: ComponentStory<typeof MainLayout> = (args) => <MainLayout {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	headerItems: HEADER_PRIMARY_ITEMS,
};
