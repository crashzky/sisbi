import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	noSelectedImage?: string;
	onRemoveImage?: () => void;
}

export default Props;
