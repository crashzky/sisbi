import { ComponentStory, ComponentMeta } from '@storybook/react';

import SignupStepFinalModal from '../../../modals/SignupStepFinalModal';

export default {
	title: 'Modals/Sinup Steps/Final Step',
	component: SignupStepFinalModal,
} as ComponentMeta<typeof SignupStepFinalModal>;

export const Primary: ComponentStory<typeof SignupStepFinalModal> = () => <SignupStepFinalModal />;
