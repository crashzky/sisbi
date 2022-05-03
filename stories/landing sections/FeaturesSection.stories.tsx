import { ComponentStory, ComponentMeta } from '@storybook/react';

import FeaturesSection from '../../landing-secitions/FeaturesSection';

export default {
	title: 'Landing/Features',
	component: FeaturesSection,
} as ComponentMeta<typeof FeaturesSection>;

export const Primary: ComponentStory<typeof FeaturesSection> = () => <FeaturesSection />;
