import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IHeaderItem } from '../../shared/types/header';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	headerItems?: IHeaderItem[];
	withFooter?: boolean;
	withHeader?: boolean;
	headerClassname?: string;
}

export default Props;
