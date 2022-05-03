import { ComponentStory, ComponentMeta } from '@storybook/react';

import PhoneIcon from '../../../assets/communication/phone.svg';

export default {
	title: 'Icons/Communication/Phone',
	component: PhoneIcon,
} as ComponentMeta<typeof PhoneIcon>;

export const Primary: ComponentStory<typeof PhoneIcon> = () => <PhoneIcon />;
