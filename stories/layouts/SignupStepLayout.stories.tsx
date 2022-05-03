import { ComponentStory, ComponentMeta } from '@storybook/react';

import SignupStepLayout from '../../layouts/SignupStepLayout';

import SingupStep1Icon from '../../assets/signup_steps/1.svg';

export default {
	title: 'Layouts/Signup Step',
	component: SignupStepLayout,
} as ComponentMeta<typeof SignupStepLayout>;

const Template: ComponentStory<typeof SignupStepLayout> = (args) => <SignupStepLayout {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	currentStep: 1,
	maxSteps: 7,
	label: 'Выберите ваш пол',
	HeaderImage: SingupStep1Icon,
	onClickBack: () => console.log('back'),
	onClickContinue: () => console.log('continue'),
};
