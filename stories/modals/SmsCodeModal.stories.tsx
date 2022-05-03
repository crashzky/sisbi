import { ComponentStory, ComponentMeta } from '@storybook/react';

import CodeModal from '../../modals/SmsCodeModal';

export default {
	title: 'Modals/Sms Code',
	component: CodeModal,
} as ComponentMeta<typeof CodeModal>;

export const Primary: ComponentStory<typeof CodeModal> = () => <CodeModal />;
