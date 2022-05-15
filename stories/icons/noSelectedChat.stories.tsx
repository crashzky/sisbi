import { ComponentStory, ComponentMeta } from '@storybook/react';

import NoSelectedChatIcon from '../../assets/no_selected_chat.svg';

export default {
	title: 'Icons/No Selected Chat',
	component: NoSelectedChatIcon,
} as ComponentMeta<typeof NoSelectedChatIcon>;

export const Primary: ComponentStory<typeof NoSelectedChatIcon> = () => <NoSelectedChatIcon />;
