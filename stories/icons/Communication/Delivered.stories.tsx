import { ComponentStory, ComponentMeta } from '@storybook/react';

import DeliveredIcon from '../../../assets/communication/delivered.svg';

export default {
	title: 'Icons/Communication/Delivered',
	component: DeliveredIcon,
} as ComponentMeta<typeof DeliveredIcon>;

export const Primary: ComponentStory<typeof DeliveredIcon> = () => <DeliveredIcon />;
