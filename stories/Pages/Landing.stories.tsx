import { ComponentStory, ComponentMeta } from '@storybook/react';
import MainPage from '../../pages/index';

export default {
	title: 'Pages/Langing',
	component: MainPage,
} as ComponentMeta<typeof MainPage>;

export const Primary: ComponentStory<typeof MainPage> = () => <MainPage />;
