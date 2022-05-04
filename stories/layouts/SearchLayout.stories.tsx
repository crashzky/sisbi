import { ComponentStory, ComponentMeta } from '@storybook/react';

import SearchLayout from '../../layouts/SearchLayout';
import { HEADER_PRIMARY_ITEMS } from '../../shared/consts/header';

export default {
	title: 'Layouts/Search Layout',
	component: SearchLayout,
} as ComponentMeta<typeof SearchLayout>;

const Template: ComponentStory<typeof SearchLayout> = (args) => <SearchLayout {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	chidren: 'Hello react',
	headerItems: HEADER_PRIMARY_ITEMS,
};
