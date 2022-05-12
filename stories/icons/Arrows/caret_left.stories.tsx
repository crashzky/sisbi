import { ComponentStory, ComponentMeta } from '@storybook/react';

import CaretLeftIcon from '../../../assets/arrows/caret_left.svg';

export default {
	title: 'Icons/Arrows/Caret left',
	component: CaretLeftIcon,
} as ComponentMeta<typeof CaretLeftIcon>;

export const Primary: ComponentStory<typeof CaretLeftIcon> = () => <CaretLeftIcon />;
