import { useRouter } from 'next/router';
import useUserType from '../useUserType';

const useProfileTab = () => {
	const router = useRouter();

	const { userType } = useUserType();

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
				/*{
					title: 'Тарифы',
					onClick: () => router.push('/prices'),
				},*/
			];
	}
};

export default useProfileTab;
