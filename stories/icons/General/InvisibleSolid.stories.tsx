import { ComponentStory, ComponentMeta } from '@storybook/react';

import InvisibleSolidIcon from '../../../assets/general/invisible_solid.svg';

export default {
	title: 'Icons/General/Invisible',
	component: InvisibleSolidIcon,
} as ComponentMeta<typeof InvisibleSolidIcon>;

export const Primary: ComponentStory<typeof InvisibleSolidIcon> = () => <InvisibleSolidIcon />;
