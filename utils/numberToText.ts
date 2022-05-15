function numberToText(number: number, type: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute'): string {
	if(number >=5 && number <= 20) { // 5 - 20
		switch(type) {
			case 'year':
				return 'лет';
			case 'month':
				return 'месяцев';
			case 'week':
				return 'недель';
			case 'day':
				return 'дней';
			case 'hour':
				return 'часов';
			case 'minute':
				return 'минут';
		}
	}
	else if(number.toString().endsWith('1')) { // ends with 1
		switch(type) {
			case 'year':
				return 'год';
			case 'month':
				return 'месяц';
			case 'week':
				return 'неделя';
			case 'day':
				return 'день';
			case 'hour':
				return 'час';
			case 'minute':
				return 'минута';
		}
	}
	else if(number.toString().endsWith('2') || number.toString().endsWith('3') || number.toString().endsWith('4')) { // ends with 2, 3, 4
		switch(type) {
			case 'year':
				return 'года';
			case 'month':
				return 'месяца';
			case 'week':
				return 'недели';
			case 'day':
				return 'дня';
			case 'hour':
				return 'часа';
			case 'minute':
				return 'минуты';
		}
	}
	else {
		switch(type) {
			case 'year':
				return 'лет';
			case 'month':
				return 'месяцев';
			case 'week':
				return 'недель';
			case 'day':
				return 'дней';
			case 'hour':
				return 'часов';
			case 'minute':
				return 'минут';
		}
	}
};

export default numberToText;
