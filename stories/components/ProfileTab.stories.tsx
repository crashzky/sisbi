import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProfileTab from '../../components/ProfileTab';

export default {
	title: 'Components/Profile Tab',
	component: ProfileTab,
} as ComponentMeta<typeof ProfileTab>;

const Template: ComponentStory<typeof ProfileTab> = (args) => <ProfileTab {...args} />;

export const Primary = Template.bind({});
