import { ComponentStory, ComponentMeta } from '@storybook/react';

import PageSlider from '../../components/PageSlider';

export default {
	title: 'Components/Page Slider',
	component: PageSlider,
} as ComponentMeta<typeof PageSlider>;

const Template: ComponentStory<typeof PageSlider> = (args) => <PageSlider {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	currentPage: 2,
	maxPages: 3,
	onMove: (pageNumber) => console.log(pageNumber),
};
