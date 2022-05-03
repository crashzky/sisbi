import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	Icon: React.FC<any>;
	label: string;
	description: string;
}

export default Props;
