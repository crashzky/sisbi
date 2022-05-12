import { ComponentStory, ComponentMeta } from '@storybook/react';

import CaretLeftSmallIcon from '../../../assets/arrows/caret_left_small.svg';

export default {
	title: 'Icons/Arrows/Caret left small',
	component: CaretLeftSmallIcon,
} as ComponentMeta<typeof CaretLeftSmallIcon>;

export const Primary: ComponentStory<typeof CaretLeftSmallIcon> = () => <CaretLeftSmallIcon />;
