import { ComponentStory, ComponentMeta } from '@storybook/react';

import SelectJobModal from '../../modals/SelectJobModal';

export default {
	title: 'Modals/Select Job',
	component: SelectJobModal,
} as ComponentMeta<typeof SelectJobModal>;

const Template: ComponentStory<typeof SelectJobModal> = (args) => <SelectJobModal {...args} />;

export const Primary = Template.bind({});
