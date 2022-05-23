import Image from 'next/image';
import Link from 'next/link';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import Headline from '../../components/Headline';
import Paragraph from '../../components/Paragraph';
import MainLayout from '../../layouts/MainLayout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getMyProfileEmployer, getStatsEmployer } from '../../shared/api/user';
import ShortVacancyCard from '../../components/ShortVacancyCard';
import { getMyVacancies } from '../../shared/api/vacancies';
import { EXPERIENCE } from '../../shared/consts/profile';

const ProfilePageEmployer = (): JSX.Element => {
	const router = useRouter();

	const myProfileUserQuery = useQuery('my_profile_employer', getMyProfileEmployer);
	const myVacanciesQuery = useQuery([{ page: 1 }], getMyVacancies);
	const statsQuery = useQuery('stats_employer', getStatsEmployer);

	const data = myProfileUserQuery.isSuccess ? myProfileUserQuery.data.payload : null;

	useEffect(() => {
		if(!localStorage.getItem('access_token'))
			router.push('/?modal=login');
	}, [router]);

	return (
		<MainLayout className='bg-[#FAFBFC] pt-10 px-40 grid grid-cols-[1fr_268px] gap-[111px]'>
			<div className='grid gap-8'>
				<section
					className='flex justify-between items-start pb-12 border-b-[1px] border-gray-80'
				>
					<div>
						<div className='grid grid-flow-col w-fit items-center gap-4 items-center mb-4'>
							<Headline variant='5' tag='h1' className='font-bold'>
								{data ? data.name : 'Загрузка...'}
							</Headline>
							<Link href='/profile/edit'>
								<a className='text-xs text-text font-semibold'>
									Редактировать
								</a>
							</Link>
						</div>
						<Paragraph variant='3' tag='p' className='mb-1'>
							{data && data.phone ? formatPhoneNumberIntl('+' + data.phone) : ''}
						</Paragraph>
						<Paragraph variant='3' tag='p' className='mb-1'>
							{data && data.email}
						</Paragraph>
					</div>
					{data && data.avatar ? (
						<Image
							width={173}
							height={173}
							className='object-cover rounded-2xl'
							src={data.avatar}
							alt='avatar' />
					) : ''}
				</section>
				<section className='pb-8 border-b-[1px] border-gray-80'>
					<div className='grid grid-flow-col w-fit items-center gap-4 mb-3'>
						<Paragraph variant='1' tag='h2' className='font-semibold'>
							О компании
						</Paragraph>
						<Link href='/profile/about'>
							<a className='text-xs text-text font-semibold'>
								Редактировать
							</a>
						</Link>
					</div>
					<Paragraph variant='5' tag='p' className='max-w-[550px]'>
						{data && data.about}
					</Paragraph>
				</section>
				<section className='pb-8'>
					<div className='grid grid-flow-col w-fit items-center gap-4 mb-3'>
						<Paragraph variant='1' tag='h2' className='font-semibold'>
							Размещенные вакансии
						</Paragraph>
						<Link href='/my_vacancies'>
							<a className='text-xs text-text font-semibold'>
								Перейти к вакансиям
							</a>
						</Link>
					</div>
					<div className='grid grid-flow-col w-fit items-center gap-4'>
						{myVacanciesQuery.isSuccess &&
						myVacanciesQuery.data.payload.sort((a, b) => a.shows > b.shows ? 1 : -1).slice(0, 4)
							.map((i, num) => (
								<ShortVacancyCard
									key={num}
									onClick={() => router.push(`/vacancies/${i.id}`)}
									className='w-[268px]'
									lastUpdate={new Date(i.updated_at)}
									label={i.title}
									minPrice={i.salary}
									description={i.description}
									tags={[
										i.job_category.name, EXPERIENCE[i.experience], ...i.type_employments.map((i) => i.name),
										...i.schedules.map((i) => i.name)]} />
							))}
					</div>
				</section>
			</div>
			<div className='grid gap-10 h-fit'>
				<div className='flex justify-between p-4 rounded-xl border-[1px] border-gray-100'>
					<div>
						<Paragraph variant='6' tag='p' className='text-text-secondary mb-1'>
							Показы
						</Paragraph>
						<Paragraph variant='4' tag='p' className='font-semibold'>
							{statsQuery.isSuccess && statsQuery.data.payload.vacancies_shows_sum}
						</Paragraph>
					</div>
					<div className='h-full border-gray-100 border-r-[1px]'></div>
					<div>
						<Paragraph variant='6' tag='p' className='text-text-secondary mb-1'>
							Просмотры
						</Paragraph>
						<Paragraph variant='4' tag='p' className='font-semibold'>
							{statsQuery.isSuccess && statsQuery.data.payload.vacancies_views_sum}
						</Paragraph>
					</div>
					<div className='h-full border-gray-100 border-r-[1px]'></div>
					<div>
						<Paragraph variant='6' tag='p' className='text-text-secondary mb-1'>
							Отклики
						</Paragraph>
						<Paragraph variant='4' tag='p' className='font-semibold'>
							{statsQuery.isSuccess && statsQuery.data.payload.responses_count}
						</Paragraph>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default ProfilePageEmployer;
