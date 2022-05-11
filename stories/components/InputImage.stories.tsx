import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputImage from '../../components/InputImage';

export default {
	title: 'Components/Input Image',
	component: InputImage,
} as ComponentMeta<typeof InputImage>;

const Template: ComponentStory<typeof InputImage> = (args) => <InputImage {...args} />;

export const Primary = Template.bind({});
