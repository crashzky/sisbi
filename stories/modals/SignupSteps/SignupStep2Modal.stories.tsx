import { ComponentStory, ComponentMeta } from '@storybook/react';

import SignupStep2Modal from '../../../modals/SignupStep2Modal';

export default {
	title: 'Modals/Sinup Steps/Step 2',
	component: SignupStep2Modal,
} as ComponentMeta<typeof SignupStep2Modal>;

export const Primary: ComponentStory<typeof SignupStep2Modal> = () => <SignupStep2Modal />;
