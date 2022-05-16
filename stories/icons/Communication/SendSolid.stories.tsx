import { ComponentStory, ComponentMeta } from '@storybook/react';

import SendSolidIcon from '../../../assets/communication/send_solid.svg';

export default {
	title: 'Icons/Communication/Send Solid',
	component: SendSolidIcon,
} as ComponentMeta<typeof SendSolidIcon>;

export const Primary: ComponentStory<typeof SendSolidIcon> = () => <SendSolidIcon />;
