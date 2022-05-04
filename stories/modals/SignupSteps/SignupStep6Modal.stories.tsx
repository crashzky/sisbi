import { ComponentStory, ComponentMeta } from '@storybook/react';

import SignupStep6Modal from '../../../modals/SignupStep6Modal';

export default {
	title: 'Modals/Sinup Steps/Step 6',
	component: SignupStep6Modal,
} as ComponentMeta<typeof SignupStep6Modal>;

export const Primary: ComponentStory<typeof SignupStep6Modal> = () => <SignupStep6Modal />;
