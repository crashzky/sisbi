import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	label?: string;
	message: string;
	sendedDate: Date;
	sender: SenderType;
	readed?: boolean;
};

type SenderType = 'me' | 'companion';

export default Props;

export type {
	SenderType,
};

