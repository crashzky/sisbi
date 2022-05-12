import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	currentPage: number;
	maxPages: number;
	onMove: (pageNumber: number) => void;
}

export default Props;
