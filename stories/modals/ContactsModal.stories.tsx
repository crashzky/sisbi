import { ComponentStory, ComponentMeta } from '@storybook/react';

import ContactsModal from '../../modals/ContactsModal';

export default {
	title: 'Modals/Contacts',
	component: ContactsModal,
} as ComponentMeta<typeof ContactsModal>;

const Template: ComponentStory<typeof ContactsModal> = (args) => <ContactsModal {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	fullName: 'Мария Соколова',
	phone: '+79139822927',
	mail: 'mail@mail.ru',
	onClose: () => {},
};
