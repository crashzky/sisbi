import { ComponentStory, ComponentMeta } from '@storybook/react';

import CloseIcon from '../../../assets/general/close.svg';

export default {
	title: 'Icons/General/Close',
	component: CloseIcon,
} as ComponentMeta<typeof CloseIcon>;

export const Primary: ComponentStory<typeof CloseIcon> = () => <CloseIcon />;
