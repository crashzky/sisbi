import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	isActive: boolean;
	label: string;
	priceTitle: string;
	description: string;
};

export default Props;
