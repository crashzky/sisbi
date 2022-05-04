let _days = [];
for (let i = 1; i <= 31; i++)
	_days.push(i);

const DAYS = _days;

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
	'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

let _years = [];
for (let i = 1800; i <= new Date(Date.now()).getFullYear(); i++)
	_years.push(i);

_years.reverse();

const YEARS = _years;

export {
	DAYS,
	MONTHS,
	YEARS,
};
