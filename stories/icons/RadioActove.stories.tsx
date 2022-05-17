import { ComponentStory, ComponentMeta } from '@storybook/react';

import RadioActiveIcon from '../../assets/radio_active.svg';

export default {
	title: 'Icons/Radio Active',
	component: RadioActiveIcon,
} as ComponentMeta<typeof RadioActiveIcon>;

export const Primary: ComponentStory<typeof RadioActiveIcon> = () => <RadioActiveIcon />;
