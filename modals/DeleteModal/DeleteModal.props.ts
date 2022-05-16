import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	message: string;
	onCancel: () => void;
	onConfirm: () => void;
};

export default Props;
