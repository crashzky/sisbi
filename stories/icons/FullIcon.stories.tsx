import { ComponentStory, ComponentMeta } from '@storybook/react';

import FullLogoIcon from '../../assets/full-logo.svg';

export default {
	title: 'Icons/Full Logo',
	component: FullLogoIcon,
} as ComponentMeta<typeof FullLogoIcon>;

export const Primary: ComponentStory<typeof FullLogoIcon> = () => <FullLogoIcon />;
