import { ComponentStory, ComponentMeta } from '@storybook/react';
import ResumePage from '../../pages/profile/resume';

export default {
	title: 'Pages/Resume',
	component: ResumePage,
} as ComponentMeta<typeof ResumePage>;

export const Primary: ComponentStory<typeof ResumePage> = () => <ResumePage />;
