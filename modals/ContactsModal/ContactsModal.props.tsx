import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	fullName: string;
	phone: string;
	mail: string;
	onClose: () => void;
};

export default Props;
