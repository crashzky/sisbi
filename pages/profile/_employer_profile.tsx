import Image from 'next/image';
import Link from 'next/link';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import Headline from '../../components/Headline';
import Paragraph from '../../components/Paragraph';
import MainLayout from '../../layouts/MainLayout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getMyProfileEmployer } from '../../shared/api/user';

import ShareSolidIcon from '../../assets/communication/share_solid.svg';
import ShortVacancyCard from '../../components/ShortVacancyCard';

const ProfilePageEmployer = (): JSX.Element => {
	const router = useRouter();

	const myProfileUserQuery = useQuery('my_profile_employer', getMyProfileEmployer);

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
						<div className='flex gap-4 items-center mb-4'>
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
					<div className='flex items-center gap-4 mb-3'>
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
					<div className='flex items-center gap-4 mb-3'>
						<Paragraph variant='1' tag='h2' className='font-semibold'>
							Размещенные вакансии
						</Paragraph>
						<Link href='/profile/about'>
							<a className='text-xs text-text font-semibold'>
								Перейти к вакансиям
							</a>
						</Link>
					</div>
					<div className='flex flex-wrap gap-4'>
						<ShortVacancyCard
							className='w-[268px]'
							lastUpdate={new Date(Date.now())}
							label='Junior UI/UX дизайнер'
							minPrice={125000}
							description={`Плотно взаимодействовать с командой, и корректировать UI в соответствии с
								возможностями современных технологий. Контролировать реализацию UI/UX, быть ответственным за
								сдачу проекта в срок.`}
							tags={['Опыт от 3 лет', 'Полный день', 'Удаленная работа', 'Любой город']} />
						<ShortVacancyCard
							className='w-[268px]'
							lastUpdate={new Date(Date.now())}
							label='Junior UI/UX дизайнер'
							minPrice={125000}
							description={`Плотно взаимодействовать с командой, и корректировать UI в соответствии с
								возможностями современных технологий. Контролировать реализацию UI/UX, быть ответственным за
								сдачу проекта в срок.`}
							tags={['Опыт от 3 лет', 'Полный день', 'Удаленная работа', 'Любой город']} />
						<ShortVacancyCard
							className='w-[268px]'
							lastUpdate={new Date(Date.now())}
							label='Junior UI/UX дизайнер'
							minPrice={125000}
							description={`Плотно взаимодействовать с командой, и корректировать UI в соответствии с
								возможностями современных технологий. Контролировать реализацию UI/UX, быть ответственным за
								сдачу проекта в срок.`}
							tags={['Опыт от 3 лет', 'Полный день', 'Удаленная работа', 'Любой город']} />
						<ShortVacancyCard
							className='w-[268px]'
							lastUpdate={new Date(Date.now())}
							label='Junior UI/UX дизайнер'
							minPrice={125000}
							description={`Плотно взаимодействовать с командой, и корректировать UI в соответствии с
								возможностями современных технологий. Контролировать реализацию UI/UX, быть ответственным за
								сдачу проекта в срок.`}
							tags={['Опыт от 3 лет', 'Полный день', 'Удаленная работа', 'Любой город']} />
					</div>
				</section>
			</div>
			<div className='grid gap-10 h-fit'>
				<div className='grid rounded-xl border-[1px] border-gray-100'>
					<button className='p-4 grid grid-cols-[20px_1fr] gap-2 items-center'>
						<ShareSolidIcon className='fill-icon' />
						<Link href='/resumes/1'>
							<a target='_blank' className='text-text text-left text-sm'>
								Поделиться
							</a>
						</Link>
					</button>
				</div>
			</div>
		</MainLayout>
	);
};

export default ProfilePageEmployer;
