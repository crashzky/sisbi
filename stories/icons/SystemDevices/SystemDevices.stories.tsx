import { ComponentStory, ComponentMeta } from '@storybook/react';

import MobileSolidIcon from '../../../assets/system_devices/mobile_solid.svg';

export default {
	title: 'Icons/System Devices/Mobile Solid',
	component: MobileSolidIcon,
} as ComponentMeta<typeof MobileSolidIcon>;

export const Primary: ComponentStory<typeof MobileSolidIcon> = () => <MobileSolidIcon />;
