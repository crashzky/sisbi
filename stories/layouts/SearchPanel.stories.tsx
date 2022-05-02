import { ComponentStory, ComponentMeta } from '@storybook/react';

import SearchPanel from '../../layouts/SearchPanel';

export default {
	title: 'Layouts/Search Panel',
	component: SearchPanel,
} as ComponentMeta<typeof SearchPanel>;

const Template: ComponentStory<typeof SearchPanel> = (args) => <SearchPanel {...args} />;

export const Primary = Template.bind({});

