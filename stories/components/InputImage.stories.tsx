import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputImage from '../../components/InputImage';

export default {
	title: 'Components/Input Image',
	component: InputImage,
} as ComponentMeta<typeof InputImage>;

const Template: ComponentStory<typeof InputImage> = (args) => (
	<InputImage
		noSelectedImage='/assets/no_selected_image.svg'
		{...args} />
);

export const Primary = Template.bind({});
