import { ComponentStory, ComponentMeta } from '@storybook/react';

import VisibleSolidIcon from '../../../assets/general/visible_solid.svg';

export default {
	title: 'Icons/General/Visible',
	component: VisibleSolidIcon,
} as ComponentMeta<typeof VisibleSolidIcon>;

export const Primary: ComponentStory<typeof VisibleSolidIcon> = () => <VisibleSolidIcon />;
