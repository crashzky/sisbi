import { ComponentStory, ComponentMeta } from '@storybook/react';

import MailSolidIcon from '../../../assets/communication/mail_solid.svg';

export default {
	title: 'Icons/Communication/Mail Solid',
	component: MailSolidIcon,
} as ComponentMeta<typeof MailSolidIcon>;

export const Primary: ComponentStory<typeof MailSolidIcon> = () => <MailSolidIcon />;
