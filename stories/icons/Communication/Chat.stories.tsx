import { ComponentStory, ComponentMeta } from '@storybook/react';

import ChatIcon from '../../../assets/communication/chat.svg';

export default {
	title: 'Icons/Communication/Chat',
	component: ChatIcon,
} as ComponentMeta<typeof ChatIcon>;

export const Primary: ComponentStory<typeof ChatIcon> = () => <ChatIcon />;
