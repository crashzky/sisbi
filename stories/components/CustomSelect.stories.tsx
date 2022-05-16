import { ComponentStory, ComponentMeta } from '@storybook/react';

import CustomSelect from '../../components/CustomSelect';

export default {
	title: 'Components/Custom Select',
	component: CustomSelect,
} as ComponentMeta<typeof CustomSelect>;

const Template: ComponentStory<typeof CustomSelect> = (args) => <CustomSelect {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	options: [
		{ value: 'Все отклики', label: 'Все отклики' },
		{ value: 'Приглашения', label: 'Приглашения' },
		{ value: 'В ожидании', label: 'В ожидании' },
		{ value: 'Отказ', label: 'Отказ' },
	],
	value: { value: 'Все отклики', label: 'Все отклики' },
};
