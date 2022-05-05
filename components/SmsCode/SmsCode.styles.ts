function getBorder(isFocused: boolean, isDanger: boolean): string {
	if(isFocused)
		return 'inset 0 0 0 1.5px #739EF1';
	else if(isDanger)
		return 'inset 0 0 0 1.5px #FF6D3B';
	else
		return '';
}

export {
	getBorder,
};
