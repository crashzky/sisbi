import { ComponentStory, ComponentMeta } from '@storybook/react';

import CheckIcon from '../../../assets/general/check.svg';

export default {
	title: 'Icons/General/Check',
	component: CheckIcon,
} as ComponentMeta<typeof CheckIcon>;

export const Primary: ComponentStory<typeof CheckIcon> = () => <CheckIcon />;
