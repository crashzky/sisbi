import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Headline from '../../components/Headline';
import PageSlider from '../../components/PageSlider';
import withCheckAuthLayout from '../../layouts/CheckAuthLayout';
import MainLayout from '../../layouts/MainLayout';
import { getMyVacancies } from '../../shared/api/vacancies';

const MyVacanciesPage = (): JSX.Element => {
	const router = useRouter();

	const { data, isSuccess } = useQuery([{ page: router.query.page ? +router.query.page : 1 }], getMyVacancies, {
		enabled: !!(router && router.query),
	});

	console.log(data); // <- my vacancies
	
	return (
		<MainLayout className='bg-[#FAFBFC] pt-10 px-40'>
			<div className='flex items-center gap-4 mb-10'>
				<Headline variant='5' tag='h1' className='font-bold'>
					Мои вакансии
				</Headline>
				<Link href='/my_vacancies/new'>
					<a className='text-xs font-semibold text-text'>
						Добавить вакансию
					</a>
				</Link>
			</div>
			<div className='grid mb-10'>

			</div>
			<PageSlider
				currentPage={router && router.query.page ? +router.query.page : 1}
				maxPages={isSuccess ? data.total_pages : 1}
				onMove={(pageNumber) => router.push('/my_vacancies', {
					query: {
						page: pageNumber,
					},
				})} />
		</MainLayout>
	);
};

export default withCheckAuthLayout(MyVacanciesPage, {
	checkLoggined: true,
	checkUserType: 'employer',
});
