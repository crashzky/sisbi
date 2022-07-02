import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CompaniesPage = (): JSX.Element => {
	const router = useRouter();

	useEffect(() => {
		if(router)
			router.push('/');
	}, [router]);

	return null;
};

export default CompaniesPage;
