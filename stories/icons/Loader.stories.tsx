import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoaderIcon from '../../assets/loader.svg';

export default {
	title: 'Icons/Loader',
	component: LoaderIcon,
} as ComponentMeta<typeof LoaderIcon>;

export const Primary: ComponentStory<typeof LoaderIcon> = () => <LoaderIcon />;
