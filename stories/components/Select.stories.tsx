import { ComponentStory, ComponentMeta } from '@storybook/react';

import Select from '../../components/Select';

export default {
	title: 'Components/Select',
	component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});

export const WithGap = Template.bind({});

Primary.args = {
	options: [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' },
	],
};

WithGap.args = {
	options: [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' },
	],
	variant: 'with_gap',
};
