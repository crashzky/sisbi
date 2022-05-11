import { ComponentStory, ComponentMeta } from '@storybook/react';

import SignupStep1EmployerModal from '../../../modals/SignupStep1EmployerModal';

export default {
	title: 'Modals/Sinup Steps/Step 1 Employer',
	component: SignupStep1EmployerModal,
} as ComponentMeta<typeof SignupStep1EmployerModal>;

export const Primary: ComponentStory<typeof SignupStep1EmployerModal> = () => <SignupStep1EmployerModal />;
