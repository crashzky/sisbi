import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputPhone from '../../components/InputPhone';

export default {
	title: 'Components/Input Phone',
	component: InputPhone,
} as ComponentMeta<typeof InputPhone>;

const Template: ComponentStory<typeof InputPhone> = (args) => <InputPhone {...args} />;

export const Primary = Template.bind({});

export const Danger = Template.bind({});

Danger.args = {
	isDanger: true,
};
