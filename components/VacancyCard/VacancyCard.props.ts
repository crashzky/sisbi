import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	imageSrc: string | null;
	companyName: string;
	companyAvatar: string | null;
	label: string;
	minPrice: number;
	description: string;
	tags: string[];
	isFavorited?: boolean;
	onRespond: () => void;
	onAddToFavorites: () => void;
	onRemoveFromFavorited: () => void;

	contactName: string;
	contactPhone: string;
	contactMail: string;
}

export default Props;
