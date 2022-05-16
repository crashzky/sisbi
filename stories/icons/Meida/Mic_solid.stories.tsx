import { ComponentStory, ComponentMeta } from '@storybook/react';

import MicSolidIcon from '../../../assets/media/Mic_solid.svg';

export default {
	title: 'Icons/Mic Solid',
	component: MicSolidIcon,
} as ComponentMeta<typeof MicSolidIcon>;

export const Primary: ComponentStory<typeof MicSolidIcon> = () => <MicSolidIcon />;
