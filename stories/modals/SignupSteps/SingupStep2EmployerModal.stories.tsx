import { ComponentStory, ComponentMeta } from '@storybook/react';

import SignupStep2EmployerModal from '../../../modals/SignupStep2EmployerModal';

export default {
	title: 'Modals/Sinup Steps/Step 2 Employer',
	component: SignupStep2EmployerModal,
} as ComponentMeta<typeof SignupStep2EmployerModal>;

export const Primary: ComponentStory<typeof SignupStep2EmployerModal> = () => <SignupStep2EmployerModal />;
