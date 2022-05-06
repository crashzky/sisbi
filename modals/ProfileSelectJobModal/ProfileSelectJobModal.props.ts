import { DetailedHTMLProps, FormHTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
	onCloseModal: () => void;
	onContinue: (id: number) => void;
	selected?: string;
}

export default Props;
