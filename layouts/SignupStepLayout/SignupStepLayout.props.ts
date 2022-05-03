import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	currentStep: number;
	maxSteps: number;
	label: string;
	HeaderImage: React.FC<any>;
	onClickBack: () => void;
	onClickContinue: () => void;
}

export default Props;
