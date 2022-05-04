import { ComponentStory, ComponentMeta } from '@storybook/react';

import SignupStep5Modal from '../../../modals/SignupStep5Modal';

export default {
	title: 'Modals/Sinup Steps/Step 5',
	component: SignupStep5Modal,
} as ComponentMeta<typeof SignupStep5Modal>;

export const Primary: ComponentStory<typeof SignupStep5Modal> = () => <SignupStep5Modal />;
