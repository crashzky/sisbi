import { ComponentStory, ComponentMeta } from '@storybook/react';

import RateButton from '../../components/RateButton';

export default {
	title: 'Components/Rate Button',
	component: RateButton,
} as ComponentMeta<typeof RateButton>;

const Template: ComponentStory<typeof RateButton> = (args) => <RateButton {...args} />;

export const Primary = Template.bind({});
