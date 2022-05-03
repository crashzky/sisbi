import { ComponentStory, ComponentMeta } from '@storybook/react';

import FeatureCard from '../../components/FeatureCard';

import ChatSolidIcon from '../../assets/communication/chat_solid.svg';

export default {
	title: 'Components/Feature Card',
	component: FeatureCard,
} as ComponentMeta<typeof FeatureCard>;

const Template: ComponentStory<typeof FeatureCard> = (args) => <FeatureCard {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	Icon: ChatSolidIcon,
	label: 'Свой полноценный месседжер',
	description: `Отправляйте фото, видео или общайтесь с помощью
	голосовых сообщений. Мы сделали все, чтобы общаться было легко!`,
};

