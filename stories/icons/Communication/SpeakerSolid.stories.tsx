import { ComponentStory, ComponentMeta } from '@storybook/react';

import SpeakerSolidIcon from '../../../assets/communication/speaker_solid.svg';

export default {
	title: 'Icons/Communication/Speaker Solid',
	component: SpeakerSolidIcon,
} as ComponentMeta<typeof SpeakerSolidIcon>;

export const Primary: ComponentStory<typeof SpeakerSolidIcon> = () => <SpeakerSolidIcon />;
