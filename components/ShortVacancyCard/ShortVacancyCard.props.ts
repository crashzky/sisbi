import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	lastUpdate: Date;
	label: string;
	minPrice: number;
	description: string;
	tags: string[];
}

export default Props;
