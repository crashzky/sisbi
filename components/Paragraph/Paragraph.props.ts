import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
	variant: ParagraphVariants;
}

type ParagraphVariants = '1' | '2' | '3' | '4' | '5' | '6';

export default Props;

export type {
	ParagraphVariants,
};
