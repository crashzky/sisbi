import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { UrlObject } from 'url';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	items: IBreadCrumbsItem[];
}

interface IBreadCrumbsItem {
	label: string;
	href: UrlObject | string;
}

export default Props;
