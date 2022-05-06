import { ComponentStory, ComponentMeta } from '@storybook/react';

import DownloadSolidIcon from '../../../assets/general/download_solid.svg';

export default {
	title: 'Icons/General/Download',
	component: DownloadSolidIcon,
} as ComponentMeta<typeof DownloadSolidIcon>;

export const Primary: ComponentStory<typeof DownloadSolidIcon> = () => <DownloadSolidIcon />;
