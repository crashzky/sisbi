import { ComponentStory, ComponentMeta } from '@storybook/react';

import Icon1 from '../../../assets/signup_steps/1.svg';

export default {
	title: 'Icons/Signup Steps/1',
	component: Icon1,
} as ComponentMeta<typeof Icon1>;

export const Primary: ComponentStory<typeof Icon1> = () => <Icon1 />;
