import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoginModal from '../../modals/LoginModal';

export default {
	title: 'Modals/Login',
	component: LoginModal,
} as ComponentMeta<typeof LoginModal>;

export const Primary: ComponentStory<typeof LoginModal> = () => <LoginModal />;
