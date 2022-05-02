import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '../../components/Button';

export default {
	title: 'Components/Button',
	component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	children: 'Действие',
	className: 'w-[314px] h-[56px]',
};

