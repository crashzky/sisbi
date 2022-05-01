import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { HeaderItem } from '../../shared/types/header';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	items?: HeaderItem[];
}

export default Props;
