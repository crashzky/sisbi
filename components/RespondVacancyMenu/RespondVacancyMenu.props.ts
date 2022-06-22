import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	errorMessage?: string;
	isLoading?: boolean;
	companyName: string;
	companyAvatar?: string;
	vacancyName: string;
	vacancyId: number;
	minPrice: number;
	contactName: string;
	contactPhone: string;
	contactMail: string;
	onContinue: (message: string, allowSendContacts: boolean) => void;
	onBack: () => void;
}

export default Props;
