import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
	variant: HeadlineVariants;
	tag: HeadlineTags;
}

type HeadlineVariants = '1' | '2' | '3' | '4' | '5' | '6';
type HeadlineTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';

export default Props;

export type {
	HeadlineVariants,
	HeadlineTags,
};
