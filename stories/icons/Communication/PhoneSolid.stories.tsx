import { ComponentStory, ComponentMeta } from '@storybook/react';

import PhoneSolidIcon from '../../../assets/communication/phone_solid.svg';

export default {
	title: 'Icons/Communication/Phone Solid',
	component: PhoneSolidIcon,
} as ComponentMeta<typeof PhoneSolidIcon>;

export const Primary: ComponentStory<typeof PhoneSolidIcon> = () => <PhoneSolidIcon />;
