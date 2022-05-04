import { ComponentStory, ComponentMeta } from '@storybook/react';

import SignupStep1Modal from '../../../modals/SignupStep1Modal';

export default {
	title: 'Modals/Sinup Steps/Step 1',
	component: SignupStep1Modal,
} as ComponentMeta<typeof SignupStep1Modal>;

export const Primary: ComponentStory<typeof SignupStep1Modal> = () => <SignupStep1Modal />;
