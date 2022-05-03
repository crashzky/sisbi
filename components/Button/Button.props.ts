import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	variant?: ButtonVariants;
	size?: ButtonSizes;
}

type ButtonVariants = 'primary' | 'secondary' | 'outline' | 'outline_secondary';
type ButtonSizes = 'L' | 'S';

export default Props;

export type {
	ButtonVariants,
	ButtonSizes,
};
