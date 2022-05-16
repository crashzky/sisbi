import { ComponentStory, ComponentMeta } from '@storybook/react';

import Message from '../../components/Message';

export default {
	title: 'Components/Message',
	component: Message,
} as ComponentMeta<typeof Message>;

const Template: ComponentStory<typeof Message> = (args) => <Message {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	label: 'Отклик на вакансию',
	message: `Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов,
		но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э.,
		то есть более двух тысячелетий назад.`,
	sendedDate: new Date(Date.now()),
	sender: 'me',
	readed: true,
};
