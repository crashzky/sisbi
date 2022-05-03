import { ComponentStory, ComponentMeta } from '@storybook/react';

import SignupModal from '../../modals/SignupModal';

export default {
	title: 'Modals/Signup',
	component: SignupModal,
} as ComponentMeta<typeof SignupModal>;

export const Primary: ComponentStory<typeof SignupModal> = () => <SignupModal />;
