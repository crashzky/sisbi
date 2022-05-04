import { ComponentStory, ComponentMeta } from '@storybook/react';

import SignupStep3Modal from '../../../modals/SignupStep3Modal';

export default {
	title: 'Modals/Sinup Steps/Step 3',
	component: SignupStep3Modal,
} as ComponentMeta<typeof SignupStep3Modal>;

export const Primary: ComponentStory<typeof SignupStep3Modal> = () => <SignupStep3Modal />;
