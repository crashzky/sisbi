import { ComponentStory, ComponentMeta } from '@storybook/react';

import SolidFlashIcon from '../../../assets/custom/solid_flash.svg';

export default {
	title: 'Icons/Custom/Solid Flash',
	component: SolidFlashIcon,
} as ComponentMeta<typeof SolidFlashIcon>;

export const Primary: ComponentStory<typeof SolidFlashIcon> = () => <SolidFlashIcon />;
