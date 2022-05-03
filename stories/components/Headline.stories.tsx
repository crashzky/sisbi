import { ComponentStory, ComponentMeta } from '@storybook/react';

import Headline from '../../components/Headline';

export default {
	title: 'Components/Headline',
	component: Headline,
} as ComponentMeta<typeof Headline>;

const Template: ComponentStory<typeof Headline> = (args) => <Headline {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	children: 'Абзац текст для демонстрации',
	tag: 'h1',
	variant: '1',
};

