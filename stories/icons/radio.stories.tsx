import { ComponentStory, ComponentMeta } from '@storybook/react';

import RadioIcon from '../../assets/radio.svg';

export default {
	title: 'Icons/Radio',
	component: RadioIcon,
} as ComponentMeta<typeof RadioIcon>;

export const Primary: ComponentStory<typeof RadioIcon> = () => <RadioIcon />;
