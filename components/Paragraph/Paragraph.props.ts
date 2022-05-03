import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
	variant: ParagraphVariants;
	tag: ParagraphTags;
}

type ParagraphVariants = '1' | '2' | '3' | '4' | '5' | '6';
type ParagraphTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';

export default Props;

export type {
	ParagraphVariants,
};
