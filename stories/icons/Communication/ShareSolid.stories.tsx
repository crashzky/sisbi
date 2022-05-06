import { ComponentStory, ComponentMeta } from '@storybook/react';

import ShareSolidIcon from '../../../assets/communication/share_solid.svg';

export default {
	title: 'Icons/Communication/Share Solid',
	component: ShareSolidIcon,
} as ComponentMeta<typeof ShareSolidIcon>;

export const Primary: ComponentStory<typeof ShareSolidIcon> = () => <ShareSolidIcon />;
