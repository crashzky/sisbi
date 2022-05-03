import { ComponentStory, ComponentMeta } from '@storybook/react';

import HelpSection from '../../landing-secitions/HelpSection';

export default {
	title: 'Landing/Help',
	component: HelpSection,
} as ComponentMeta<typeof HelpSection>;

export const Primary: ComponentStory<typeof HelpSection> = () => <HelpSection />;
