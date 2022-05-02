import { HeadlineVariants } from './Headline.props';

const HEADLINE_1_STYLES = 'text-[3.5rem] leading-[4rem]';
const HEADLINE_2_STYLES = 'text-5xl leading-[3.5rem]';
const HEADLINE_3_STYLES = 'text-[2.5rem] leading-[3rem]';
const HEADLINE_4_STYLES = 'text-4xl leading-[2.75rem]';
const HEADLINE_5_STYLES = 'text-[2rem] leading-10';
const HEADLINE_6_STYLES = 'text-[1.75rem] leading-[2.25rem]';

function getHeadlineStyles(variant: HeadlineVariants): string {
	switch(variant) {
		case '1':
			return HEADLINE_1_STYLES;
		case '2':
			return HEADLINE_2_STYLES;
		case '3':
			return HEADLINE_3_STYLES;
		case '4':
			return HEADLINE_4_STYLES;
		case '5':
			return HEADLINE_5_STYLES;
		case '6':
			return HEADLINE_6_STYLES;
	}
}

export {
	getHeadlineStyles,
};
