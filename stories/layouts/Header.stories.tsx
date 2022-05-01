import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from '../../layouts/Header';
import { HEADER_EMPLOYEE_ITEMS, HEADER_EMPLOYER_ITEMS, HEADER_LANDING_ITEMS } from '../../shared/consts/header';

export default {
	title: 'Layouts/Header',
	component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Primary = Template.bind({});

export const Landing = Template.bind({});

export const Employee = Template.bind({});

export const Employer = Template.bind({});

Landing.args = {
	items: HEADER_LANDING_ITEMS,
};

Employee.args = {
	items: HEADER_EMPLOYEE_ITEMS,
};

Employer.args = {
	items: HEADER_EMPLOYER_ITEMS,
};
