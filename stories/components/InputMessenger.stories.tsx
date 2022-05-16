import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputMessenger from '../../components/InputMessenger';

export default {
	title: 'Components/Input Messenger',
	component: InputMessenger,
} as ComponentMeta<typeof InputMessenger>;

const Template: ComponentStory<typeof InputMessenger> = (args) => <InputMessenger {...args} />;

export const Primary = Template.bind({});
