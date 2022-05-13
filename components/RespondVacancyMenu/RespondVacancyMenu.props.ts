import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	companyName: string;
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
