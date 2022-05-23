function yearsToText(yearsCount: number): 'год' | 'года' | 'лет' {
	if(yearsCount % 10 === 1 && yearsCount !== 11)
		return 'год';
	else if(yearsCount % 10 >= 2 && yearsCount % 10 <= 4 && yearsCount !== 12 && yearsCount !== 13 && yearsCount !== 14)
		return 'года';
	else
		return 'лет';
}

export default yearsToText;
