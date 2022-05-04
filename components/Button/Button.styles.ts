import { ButtonSizes, ButtonVariants } from './Button.props';

const BUTTON_COMMON_STYLES = 'rounded-xl text-sm ';

const BUTTON_PRIMARY_STYLES = BUTTON_COMMON_STYLES + 'bg-button text-white';
const BUTTON_SECONDARY_STYLES = BUTTON_COMMON_STYLES + 'bg-button-secondary ';
const BUTTON_OUTLINE_STYLES = BUTTON_COMMON_STYLES + 'border-[1px] border-darkBlue text-darkBlue bg-white';
const BUTTON_OUTLINE_SECONDARY_STYLES = BUTTON_COMMON_STYLES + 'border-[1px] border-button-secondary';

const BUTTON_L_STYLES = 'font-semibold';

function getColorStyles(theme_name: ButtonVariants): string {
	switch(theme_name) {
		case 'primary':
			return BUTTON_PRIMARY_STYLES;
		case 'secondary':
			return BUTTON_SECONDARY_STYLES;
		case 'outline':
			return BUTTON_OUTLINE_STYLES;
		case 'outline_secondary':
			return BUTTON_OUTLINE_SECONDARY_STYLES;
	}
}

function getSizeStyles(theme_name: ButtonSizes): string {
	switch(theme_name) {
		case 'L':
			return BUTTON_L_STYLES;
		case 'S':
			return '';
	}
}

export {
	getColorStyles,
	getSizeStyles,
};
