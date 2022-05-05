import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	isDanger?: boolean;
	inputClassname?: string;
}

export default Props;
