import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface Props extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'placeholder'> {
	inputClassname?: string;
	isDanger?: boolean;
	onClear?: () => void;
}

export default Props;
