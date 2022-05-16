import { InputVariants } from './Input.props';

function getBorder(isFocused: boolean, isDanger: boolean): string {
	if(isFocused)
		return 'inset 0 0 0 1.5px #739EF1';
	else if(isDanger)
		return 'inset 0 0 0 1.5px #FF6D3B';	
	else
		return '';
}

function getTextColor(isFocused: boolean, isDanger: boolean): string {
	if(isDanger && !isFocused)
		return 'placeholder:text-red text-red';	
	else
		return 'placeholder:text-text-secondary';
}

function getContainerStyles(variant: InputVariants): string {
	switch(variant) {
		case 'classic':
			return 'bg-gray-40 py-4.5 px-4';
		case 'outline':
			return 'border-[1px] border-gray-100 py-[10px] px-3';
	}
}

export {
	getBorder,
	getTextColor,
	getContainerStyles,
};
