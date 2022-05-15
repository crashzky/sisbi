import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputSearch from '../../components/InputSearch';

export default {
	title: 'Components/Input Search',
	component: InputSearch,
} as ComponentMeta<typeof InputSearch>;

const Template: ComponentStory<typeof InputSearch> = (args) => <InputSearch {...args} />;

export const Primary = Template.bind({});

export const Danger = Template.bind({});

Danger.args = {
	isDanger: true,
};
