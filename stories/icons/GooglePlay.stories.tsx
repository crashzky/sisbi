import { ComponentStory, ComponentMeta } from '@storybook/react';

import GooglePlayIcon from '../../assets/google-play.svg';

export default {
	title: 'Icons/Google Play',
	component: GooglePlayIcon,
} as ComponentMeta<typeof GooglePlayIcon>;

export const Primary: ComponentStory<typeof GooglePlayIcon> = () => <GooglePlayIcon />;
