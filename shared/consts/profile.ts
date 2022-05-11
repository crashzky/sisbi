const GENDERS = {
	'male': 'Мужской',
	'female': 'Женский',
};

const EXPERIENCE = {
	'no': 'Нет опыта',
	'y_1_3': '1 - 3 года',
	'y_2_6': '2 - 6 лет',
	'more_6': 'более 6 лет',
};

const TO_EXPERIENCE = {
	'Нет опыта': 'no',
	'1 - 3 года': 'y_1_3',
	'2 - 6 лет': 'y_2_6',
	'более 6 лет': 'more_6',
};

const EDUCATION = {
	'secondary': 'Среднее образование',
	'secondary_special': 'Среднее профессиональное образование',
	'incomplete_higher': 'Неоконченное высшее образование',
	'higher': 'Высшее образование',
	'bachelor': 'Бакалавр',
	'master': 'Магистр',
	'candidate': 'Кандидат наук',
	'doctor': 'Доктор наук',
};

const TO_EDUCATION = {
	'Среднее образование': 'secondary',
	'Среднее профессиональное образование': 'secondary_special',
	'Неоконченное высшее образование': 'incomplete_higher',
	'Высшее образование': 'higher',
	'Бакалавр': 'bachelor',
	'Магистр': 'master',
	'Кандидат наук': 'candidate',
	'Доктор наук': 'doctor',
};

export {
	GENDERS,
	EXPERIENCE,
	EDUCATION,
	TO_EXPERIENCE,
	TO_EDUCATION,
};
