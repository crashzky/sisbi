import { ComponentStory, ComponentMeta } from '@storybook/react';

import LogoIcon from '../../assets/logo.svg';

export default {
	title: 'Icons/Logo',
	component: LogoIcon,
} as ComponentMeta<typeof LogoIcon>;

export const Primary: ComponentStory<typeof LogoIcon> = () => <LogoIcon />;
