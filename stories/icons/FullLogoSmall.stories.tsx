import { ComponentStory, ComponentMeta } from '@storybook/react';

import FullLogoSmallIcon from '../../assets/full-logo-small.svg';

export default {
	title: 'Icons/Full Logo Small',
	component: FullLogoSmallIcon,
} as ComponentMeta<typeof FullLogoSmallIcon>;

export const Primary: ComponentStory<typeof FullLogoSmallIcon> = () => <FullLogoSmallIcon />;
