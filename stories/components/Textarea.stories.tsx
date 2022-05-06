import { ComponentStory, ComponentMeta } from '@storybook/react';

import Textarea from '../../components/Textarea';

export default {
	title: 'Components/Textarea',
	component: Textarea,
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => <Textarea {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	
};

