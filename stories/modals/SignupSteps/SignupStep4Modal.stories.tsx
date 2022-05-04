import { ComponentStory, ComponentMeta } from '@storybook/react';

import SignupStep4Modal from '../../../modals/SignupStep4Modal';

export default {
	title: 'Modals/Sinup Steps/Step 4',
	component: SignupStep4Modal,
} as ComponentMeta<typeof SignupStep4Modal>;

export const Primary: ComponentStory<typeof SignupStep4Modal> = () => <SignupStep4Modal />;
