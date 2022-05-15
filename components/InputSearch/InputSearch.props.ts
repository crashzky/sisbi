import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	inputClassname?: string;
	isDanger?: boolean;
	onClear?: () => void;
}

export default Props;
