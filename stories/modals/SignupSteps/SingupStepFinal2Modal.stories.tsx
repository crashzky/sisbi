import { ComponentStory, ComponentMeta } from '@storybook/react';

import SignupStepFina2lModal from '../../../modals/SignupStepFina2lModal';

export default {
	title: 'Modals/Sinup Steps/Final Step Employer',
	component: SignupStepFina2lModal,
} as ComponentMeta<typeof SignupStepFina2lModal>;

export const Primary: ComponentStory<typeof SignupStepFina2lModal> = () => <SignupStepFina2lModal />;
