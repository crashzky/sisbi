import { ComponentStory, ComponentMeta } from '@storybook/react';

import HelpCard from '../../components/HelpCard';

export default {
	title: 'Components/Help Card',
	component: HelpCard,
} as ComponentMeta<typeof HelpCard>;

const Template: ComponentStory<typeof HelpCard> = (args) => <HelpCard {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	label: 'В чем уникальность вашего мессенджера?',
	description: `В отличии от других сервисов мы предоставляем полноценный мессенджер,
		в котором доступны отправка фото, видео и аудио сообщений. Это позволяет работодателям
		запрашивать у соискателей видео-презентацию о себе и избавляет от необходимости проводить
		первичные собеседования для того, чтобы познакомиться с кандидатом получше.`,
};

