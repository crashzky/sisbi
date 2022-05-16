import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	avatar: string | null;
	name: string;
	surname: string;
	birthday: Date;
	city: string;
	minSalary: number;
	vacancyName: string;
	skills: string[];
	about: string;
	tags: string[];
	onRespond: () => void;
};

export default Props;
