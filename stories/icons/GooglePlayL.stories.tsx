import { ComponentStory, ComponentMeta } from '@storybook/react';

import GooglePlayLIcon from '../../assets/google-play-L.svg';

export default {
	title: 'Icons/Google Play L',
	component: GooglePlayLIcon,
} as ComponentMeta<typeof GooglePlayLIcon>;

export const Primary: ComponentStory<typeof GooglePlayLIcon> = () => <GooglePlayLIcon />;
