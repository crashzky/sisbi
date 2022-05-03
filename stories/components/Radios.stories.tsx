import { ComponentStory, ComponentMeta } from '@storybook/react';

import Radio from '../../components/Radio';

export default {
	title: 'Components/Radio',
	component: Radio,
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	items: [
		'Ищу работу',
		'Ищу сотрудников',
	],
	name: 'radio',
};

