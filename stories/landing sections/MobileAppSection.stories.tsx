import { ComponentStory, ComponentMeta } from '@storybook/react';

import MobileAppSection from '../../landing-secitions/MobileAppSection';

export default {
	title: 'Landing/Mobile App',
	component: MobileAppSection,
} as ComponentMeta<typeof MobileAppSection>;

export const Primary: ComponentStory<typeof MobileAppSection> = () => <MobileAppSection />;
