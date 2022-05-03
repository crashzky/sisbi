import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IHeaderItem } from '../../shared/types/header';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	items?: IHeaderItem[];
}

export default Props;
