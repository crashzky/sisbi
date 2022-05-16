import { ComponentStory, ComponentMeta } from '@storybook/react';

import DeleteModal from '../../modals/DeleteModal';

export default {
	title: 'Modals/Delete',
	component: DeleteModal,
} as ComponentMeta<typeof DeleteModal>;

const Template: ComponentStory<typeof DeleteModal> = (args) => <DeleteModal {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	message: 'Работодатель больше не сможет вам писать, все материалы будут удалены ',
	onCancel: () => {},
	onConfirm: () => {},
};
