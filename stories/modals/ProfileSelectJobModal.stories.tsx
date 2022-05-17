import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProfileSelectJobModal from '../../modals/ProfileSelectJobModal';

export default {
	title: 'Modals/Profile Select Job',
	component: ProfileSelectJobModal,
} as ComponentMeta<typeof ProfileSelectJobModal>;

export const Primary: ComponentStory<typeof ProfileSelectJobModal> = (args) => <ProfileSelectJobModal {...args} />;

Primary.args = {
	onCloseModal: null,
	onContinue: null,
};
