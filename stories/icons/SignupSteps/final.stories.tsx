import { ComponentStory, ComponentMeta } from '@storybook/react';

import FinalIcon from '../../../assets/signup_steps/final.svg';

export default {
	title: 'Icons/Signup Steps/Final',
	component: FinalIcon,
} as ComponentMeta<typeof FinalIcon>;

export const Primary: ComponentStory<typeof FinalIcon> = () => <FinalIcon />;
