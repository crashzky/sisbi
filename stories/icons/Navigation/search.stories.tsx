import { ComponentStory, ComponentMeta } from '@storybook/react';

import SearchIcon from '../../../assets/navigation/search.svg';

export default {
	title: 'Icons/Navigation/Search',
	component: SearchIcon,
} as ComponentMeta<typeof SearchIcon>;

export const Primary: ComponentStory<typeof SearchIcon> = () => <SearchIcon />;
