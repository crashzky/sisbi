import { ComponentStory, ComponentMeta } from '@storybook/react';

import Input from '../../components/Input';

export default {
	title: 'Components/Input',
	component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});

export const Danger = Template.bind({});

Primary.args = {
	placeholder: 'Имя',
};

Danger.args = {
	placeholder: 'Имя',
	isDanger: true,
};
