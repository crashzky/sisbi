import { ComponentStory, ComponentMeta } from '@storybook/react';

import RateIcon from '../../../assets/general/rate.svg';

export default {
	title: 'Icons/General/Rate',
	component: RateIcon,
} as ComponentMeta<typeof RateIcon>;

export const Primary: ComponentStory<typeof RateIcon> = () => <RateIcon />;
