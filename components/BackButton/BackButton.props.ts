import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { UrlObject } from 'url';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	title?: string;
	href?: UrlObject | string;
	onClick?: () => void;
};

export default Props;
