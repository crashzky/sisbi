import { ComponentStory, ComponentMeta } from '@storybook/react';
import Footer from '../../layouts/Footer';

export default {
	title: 'Layouts/Footer',
	component: Footer,
} as ComponentMeta<typeof Footer>;

export const Primary: ComponentStory<typeof Footer> = () => <Footer />;
