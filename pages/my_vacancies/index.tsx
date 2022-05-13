import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Headline from '../../components/Headline';
import MyVacancyCard from '../../components/MyVacancyCard';
import PageSlider from '../../components/PageSlider';
import withCheckAuthLayout from '../../layouts/CheckAuthLayout';
import MainLayout from '../../layouts/MainLayout';
import { getMyVacancies } from '../../shared/api/vacancies';
import { EXPERIENCE } from '../../shared/consts/profile';

const MyVacanciesPage = (): JSX.Element => {
	const router = useRouter();

	const { data, isSuccess } = useQuery([{ page: router.query.page ? +router.query.page : 1 }], getMyVacancies, {
		enabled: !!(router && router.query),
	});

	function getRoundedStyles(current) {
		let className = [];

		if(current === 0)
			className.push('rounded-t-3xl');
		if(current === data.payload.length - 1)
			className.push('rounded-b-3xl');
		if(current % 2 !== 0 && current !== data.payload.length - 1)
			className.push('border-y-0');
		else if(current === data.payload.length - 1 && current % 2 !== 0)
			className.push('border-t-0');

		return className.join(' ');
	}
	
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
				{isSuccess && data.payload.map((i, num) => (
					<MyVacancyCard
						className={getRoundedStyles(num)}
						vacancyId={i.id}
						key={num}
						imageSrc={i.avatar}
						label={i.title}
						minPrice={i.salary}
						description={i.description}
						tags={[
							i.job_category.name, EXPERIENCE[i.experience], ...i.type_employments.map((i) => i.name),
							...i.schedules.map((i) => i.name)]}
						last_update={i.updated_at}
						views={i.views}
						shows={i.shows}
						state={i.state} />
				))}
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
