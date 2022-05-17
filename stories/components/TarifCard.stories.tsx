import { ComponentStory, ComponentMeta } from '@storybook/react';

import TarifCard from '../../components/TarifCard';

export default {
	title: 'Components/Tarif Card',
	component: TarifCard,
} as ComponentMeta<typeof TarifCard>;

const Template: ComponentStory<typeof TarifCard> = (args) => <TarifCard {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	isActive: false,
	label: 'Тариф “Все отклики на вакансию”',
	priceTitle: '700 ₽ за вакансию',
	description: `Получите доступ ко всем откликам на определнной вакансии + на все отклики,
		которые будут поступать следующие 7 дней`,
};

