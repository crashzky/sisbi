import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	imageSrc: string | null;
	companyName: string;
	companyAvatar: string | null;
	label: string;
	minPrice: number;
	description: string;
	tags: string[];
	onRespond: () => void;

	contactName: string;
	contactPhone: number;
	contactMail: string;
}

export default Props;
