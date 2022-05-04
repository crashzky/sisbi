import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	imageSrc: string;
	companyName: string;
	label: string;
	minPrice: number;
	description: string;
	tags: string[];
}

export default Props;
