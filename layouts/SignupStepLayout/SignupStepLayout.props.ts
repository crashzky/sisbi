import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	currentStep?: number;
	maxSteps?: number;
	label?: string;
	isLoading?: boolean;
	HeaderImage: React.FC<any>;
	onClickBack?: () => void;
	onClickContinue?: () => void;
	backButtonLabel?: string;
	continueButtonLabel?: string;
}

export default Props;
