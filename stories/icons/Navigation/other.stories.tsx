import { ComponentStory, ComponentMeta } from '@storybook/react';

import OtherIcon from '../../../assets/navigation/other.svg';

export default {
	title: 'Icons/Navigation/Other',
	component: OtherIcon,
} as ComponentMeta<typeof OtherIcon>;

export const Primary: ComponentStory<typeof OtherIcon> = () => <OtherIcon />;
