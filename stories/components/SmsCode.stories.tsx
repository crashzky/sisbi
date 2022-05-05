import { ComponentStory, ComponentMeta } from '@storybook/react';

import SmsCode from '../../components/SmsCode';

export default {
	title: 'Components/Sms Code',
	component: SmsCode,
} as ComponentMeta<typeof SmsCode>;

const Template: ComponentStory<typeof SmsCode> = (args) => <SmsCode {...args} />;

export const Primary = Template.bind({});

export const Danger = Template.bind({});

Primary.args = {
	onCodeSubmit: (code) => console.log(code),
};

Danger.args = {
	onCodeSubmit: (code) => console.log(code),
	isDanger: true,
};

