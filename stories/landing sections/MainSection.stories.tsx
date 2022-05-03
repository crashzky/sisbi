import { ComponentStory, ComponentMeta } from '@storybook/react';

import MainSection from '../../landing-secitions/MainSection';

export default {
	title: 'Landing/Main',
	component: MainSection,
} as ComponentMeta<typeof MainSection>;

export const Primary: ComponentStory<typeof MainSection> = () => <MainSection />;
