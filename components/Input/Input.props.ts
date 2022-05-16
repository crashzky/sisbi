import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	isDanger?: boolean;
	inputClassname?: string;
	outline?: boolean;
	variant?: InputVariants;
}

type InputVariants = 'classic' | 'outline';

export default Props;

export type {
	InputVariants,
};
