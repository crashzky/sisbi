import { ComponentStory, ComponentMeta } from '@storybook/react';

import ChatItem from '../../components/ChatItem';

export default {
	title: 'Components/Chat Item',
	component: ChatItem,
} as ComponentMeta<typeof ChatItem>;

const Template: ComponentStory<typeof ChatItem> = (args) => <ChatItem {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	companionAvatar: '',
	companionName: 'Рич Фэмили',
	vacancyName: 'UI/UX дизайнер',
	lastMessageValue: 'Здравствуйте! Я бы хотел работать в вашей компании',
	lastMessageSender: 'companion',
	lastMessageReadedDate: new Date(Date.now()),
};

