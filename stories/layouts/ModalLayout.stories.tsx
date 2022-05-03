import { ComponentStory, ComponentMeta } from '@storybook/react';

import MainLayout from '../../layouts/MainLayout';
import LoginModal from '../../modals/LoginModal';

export default {
	title: 'Layouts/Modal Layout',
	component: MainLayout,
} as ComponentMeta<typeof MainLayout>;

const Template: ComponentStory<typeof MainLayout> = (args) => <MainLayout {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	children: (
		<h1>
			Hello world!
		</h1>
	),
	modals: {
		'login': <LoginModal />,
	},
};
