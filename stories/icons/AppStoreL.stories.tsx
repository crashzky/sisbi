import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppStoreLIcon from '../../assets/app-store-L.svg';

export default {
	title: 'Icons/App Store L',
	component: AppStoreLIcon,
} as ComponentMeta<typeof AppStoreLIcon>;

export const Primary: ComponentStory<typeof AppStoreLIcon> = () => <AppStoreLIcon />;
