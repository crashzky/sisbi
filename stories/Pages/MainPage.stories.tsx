import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProfilePage from '../../pages/profile';

export default {
	title: 'Pages/Profile',
	component: ProfilePage,
} as ComponentMeta<typeof ProfilePage>;

export const Primary: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;