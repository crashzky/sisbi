import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	isDanger?: boolean;
	onCodeChanged: (code: string) => void;
}

export default Props;
