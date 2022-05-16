import { ComponentStory, ComponentMeta } from '@storybook/react';

import DropdownArrowIcon from '../../../assets/arrows/dropdown_arrow.svg';

export default {
	title: 'Icons/Arrows/Dropdown Arrow',
	component: DropdownArrowIcon,
} as ComponentMeta<typeof DropdownArrowIcon>;

export const Primary: ComponentStory<typeof DropdownArrowIcon> = () => <DropdownArrowIcon />;
