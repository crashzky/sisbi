import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	name: string;
	surname: string;
	isLoading: boolean;
	errorMessage: string;
	vacancyName: string;
	resumeId: number;
	minPrice: number;
	onContinue: (message: string, allowSendContacts: boolean, vacancyId: number) => void;
	onBack: () => void;
};

export default Props;
