import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

import Radio from '../../components/Radio';

export default {
	title: 'Components/Radio',
	component: Radio,
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => {
	const [value, setValue] = useState(null);

	return <Radio value={value} onChange={(e) => setValue(e.target.value)} {...args} />;
};

export const Primary = Template.bind({});

Primary.args = {
	items: [
		'Ищу работу',
		'Ищу сотрудников',
	],
	name: 'radio',
};

