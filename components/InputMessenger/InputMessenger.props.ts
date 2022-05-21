import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface Props extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'placeholder'> {
	chatId: number;
}

export default Props;
