import { ComponentStory, ComponentMeta } from '@storybook/react';

import Paragraph from '../../components/Paragraph';

export default {
	title: 'Components/Paragraph',
	component: Paragraph,
} as ComponentMeta<typeof Paragraph>;

const Template: ComponentStory<typeof Paragraph> = (args) => <Paragraph {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	children: 'Абзац текст для демонстрации',
	variant: '1',
};

