function getContainerBorder(isDanger: boolean, isFocused: boolean): string {
	if(isDanger)
		return 'inset 0 0 0 1.5px #FF6D3B';
	else if(isFocused)
		return 'inset 0 0 0 1.5px #739EF1';
	else
		return 'inset 0 0 0 1.5px #F3F3F5';
}

function getIconColor(isDanger: boolean, isFocused: boolean, value: string | number | readonly string[]): string {
	if(isDanger)
		return 'fill-red';
	else if(isFocused || value)
		return '';
	else
		return 'fill-icon-secondary';
}

function getInputColor(isDanger: boolean): string {
	if(isDanger)
		return 'text-red placeholder:text-red';
	else
		return 'placeholder:text-text-secondary';
}

export {
	getContainerBorder,
	getIconColor,
	getInputColor,
};
