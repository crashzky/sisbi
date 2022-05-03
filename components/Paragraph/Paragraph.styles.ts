import { ParagraphVariants } from './Paragraph.props';

const PARAGRAPH_1_STYLES = 'text-2xl';
const PARAGRAPH_2_STYLES = 'text-xl';
const PARAGRAPH_3_STYLES = 'text-lg leading-6';
const PARAGRAPH_4_STYLES = 'leading-[22px]';
const PARAGRAPH_5_STYLES = 'text-sm';
const PARAGRAPH_6_STYLES = 'text-xs';

function getParagraphStyles(variant: ParagraphVariants): string {
	switch(variant) {
		case '1':
			return PARAGRAPH_1_STYLES;
		case '2':
			return PARAGRAPH_2_STYLES;
		case '3':
			return PARAGRAPH_3_STYLES;
		case '4':
			return PARAGRAPH_4_STYLES;
		case '5':
			return PARAGRAPH_5_STYLES;
		case '6':
			return PARAGRAPH_6_STYLES;
	}
}

export {
	getParagraphStyles,
};
