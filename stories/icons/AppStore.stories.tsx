import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppStoreIcon from '../../assets/app-store.svg';

export default {
	title: 'Icons/App Store',
	component: AppStoreIcon,
} as ComponentMeta<typeof AppStoreIcon>;

export const Primary: ComponentStory<typeof AppStoreIcon> = () => <AppStoreIcon />;
