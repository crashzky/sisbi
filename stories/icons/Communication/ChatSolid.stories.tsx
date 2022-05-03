import { ComponentStory, ComponentMeta } from '@storybook/react';

import ChatSolidIcon from '../../../assets/communication/chat_solid.svg';

export default {
	title: 'Icons/Communication/Chat Solid',
	component: ChatSolidIcon,
} as ComponentMeta<typeof ChatSolidIcon>;

export const Primary: ComponentStory<typeof ChatSolidIcon> = () => <ChatSolidIcon />;
