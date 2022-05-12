import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useProfileTab = () => {
	const router = useRouter();

	const [userType, setUserType] = useState(null);

	useEffect(() => {
		setUserType(localStorage.getItem('user_type'));
	}, []);

	switch(userType) {
		case 'user':
			return [
				{
					title: 'Моё резюме',
					onClick: () => router.push('/profile'),
				},
				{
					title: 'Мессенджер',
					onClick: () => router.push('/messenger'),
				},
			];
		case 'employer':
			return [
				{
					title: 'Мои вакансии',
					onClick: () => router.push('/my_vacancies'),
				},
				{
					title: 'О компании',
					onClick: () => router.push('/profile'),
				},
				{
					title: 'Мессенджер',
					onClick: () => router.push('/messenger'),
				},
				{
					title: 'Тарифы',
					onClick: () => router.push('/prices'),
				},
			];
	}
};

export default useProfileTab;
