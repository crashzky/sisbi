import { intervalToDuration, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import Headline from '../../components/Headline';
import Paragraph from '../../components/Paragraph';
import MainLayout from '../../layouts/MainLayout';
import Switch from '../../components/Switch';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getMyProfileUser } from '../../shared/api/user';
import { EDUCATION, EXPERIENCE, GENDERS } from '../../shared/consts/profile';

import ShareSolidIcon from '../../assets/communication/share_solid.svg';
import DownloadSolidIcon from '../../assets/general/download_solid.svg';

const ProfilePageUser = (): JSX.Element => {
	const router = useRouter();

	const myProfileUserQuery = useQuery('my_profile', getMyProfileUser);

	const data = myProfileUserQuery.isSuccess ? myProfileUserQuery.data.payload : null;

	const birthdayInterval = intervalToDuration({
		start: data && data.birthday ? new Date(data.birthday) : new Date(Date.now()),
		end: new Date(Date.now()),
	});

	const birthday_date = format(new Date(2005, 0, 18), 'dd MMMM yyyy', {
		locale: ru,
	});

	useEffect(() => {
		if(!localStorage.getItem('access_token'))
			router.push('/?modal=login');
	}, [router]);

	function getReadyMission() {
		if(data && data.ready_mission)
			return 'готов к командировкам';
		else if(data && !data.ready_mission)
			return 'не готов к командировкам';
		else
			return '';
	}

	function getReadyMove() {
		if(data && data.ready_move)
			return 'готов к переезду';
		else if(data && !data.ready_move)
			return 'не готов к переезду';
		else
			return '';
	}

	function getVisionStatus() {
		if(!data)
			return '';
		else {
			switch(data.state) {
				case 'created':
				case 'deactivated':
					return 'Сейчас это резюме никому не видно';
				case 'active':
					return 'Сейчас это резюме видно всем';
				case 'moderating':
					return 'Сейчас это на модерации, после оно будет видно всем';
			}
		}
	}

	return (
		<MainLayout className='bg-[#FAFBFC] pt-10 px-40 grid grid-cols-[1fr_268px] gap-[111px] print:block print:px-0'>
			<div className='grid gap-8'>
				<div className='hidden print:flex justify-end'>
					<img
						width={105}
						height={45}
						src='/assets/full_logo.svg'
						alt='logo' />
				</div>
				<div
					className='flex justify-between items-start pb-12 border-b-[1px] border-gray-80 print:border-none print:pb-0'
				>
					<div>
						<div className='flex gap-4 items-center mb-4'>
							<Headline variant='5' tag='h1' className='font-bold'>
								{data ? `${data.first_name} ${data.surname} ${data.last_name}` : 'Загрузка...'}
							</Headline>
							<Link href='/profile/edit'>
								<a className='text-xs text-text font-semibold print:hidden'>
									Редактировать
								</a>
							</Link>
						</div>
						<div className='print:hidden'>
							{/* For site */}
							<Paragraph variant='3' tag='p' className='mb-1'>
								{data && data.birthday ? `${birthdayInterval.years} лет, ${birthday_date}` : 'Нет информации'}
							</Paragraph>
							<Paragraph variant='3' tag='p' className='mb-3'>
								{data && data.city}
							</Paragraph>
							<Paragraph variant='3' tag='p' className='mb-1'>
								{data && data.phone ? formatPhoneNumberIntl('+' + data.phone) : ''}
							</Paragraph>
							<Paragraph variant='3' tag='p' className='mb-1'>
								{data && data.email}
							</Paragraph>
						</div>

						<div className='hidden print:block'>
							{/* For print */}
							<Paragraph variant='3' tag='p' className='mb-1'>
								{data && data.birthday
									? `${GENDERS[data.gender]}, ${birthdayInterval.years} лет, родился ${birthday_date}`
									: 'Нет информации'}
							</Paragraph>
							<Paragraph variant='3' tag='p' className='mb-3'>
								{data ? `${data.city ? data.city + ', ' : ''} ${getReadyMove()}, ${getReadyMission()}` : ''}
							</Paragraph>
							<Paragraph variant='4' tag='p' className='font-bold mt-8 mb-2'>
								Контакты
							</Paragraph>
							<Paragraph variant='3' tag='p' className='mb-1'>
								{data && data.phone ? 'Мобильный телефон: ' + formatPhoneNumberIntl('+' + data.phone) : ''}
							</Paragraph>
							<Paragraph variant='3' tag='p' className='mb-1'>
								{data && data.email ? `Почта: ${data.email}` : ''}
							</Paragraph>

							<Paragraph variant='4' tag='p' className='font-bold mt-4.5'>
								Образование
							</Paragraph>
							<Paragraph variant='3' tag='p' className='mb-1'>
								{data && data.education ? EDUCATION[data.education] : ''}
							</Paragraph>
						</div>
					</div>
					{data && data.avatar ? (
						<Image
							width={173}
							height={220}
							className='object-cover rounded-2xl print:rounded-none'
							src={data.avatar}
							alt='avatar' />
					) : ''}
				</div>
				<div className='pb-8 border-b-[1px] border-gray-80 print:border-none print:pb-0'>
					<div className='flex items-center gap-4 mb-1'>
						<Paragraph variant='1' tag='h2' className='font-semibold'>
							{data && data.previous_job}
						</Paragraph>
						<Link href='/profile/resume'>
							<a className='text-xs text-text font-semibold print:hidden'>
								Редактировать
							</a>
						</Link>
					</div>
					{data && (data.min_salary || data.min_salary === 0) ? (
						<Paragraph variant='3' tag='p' className='font-semibold mb-3'>
							{`Зарплата от ${data.min_salary} ₽`}
						</Paragraph>
					) : ''}
					<Paragraph variant='5' tag='p' className='text-text-secondary mb-4 print:hidden'>
						{(data && data.job_category) && data.job_category.name}
					</Paragraph>
					<div className='grid grid-cols-[repeat(2,auto)] gap-y-7 gap-x-3 print:gap-y-0  w-fit mb-4'>
						{data && data.experience ? (
							<>
								<Paragraph variant='5' tag='p'>
									Опыт работы
								</Paragraph>
								<Paragraph variant='5' tag='p'>
									{EXPERIENCE[data.experience]}
								</Paragraph>
							</>
						) : ''}
						<Paragraph variant='5' tag='p'>
							Тип занятости
						</Paragraph>
						<Paragraph variant='5' tag='p'>
							{data && data.schedules.map((i) => i.name).join(', ')}
						</Paragraph>
						<Paragraph variant='5' tag='p'>
							График работы
						</Paragraph>
						<Paragraph variant='5' tag='p'>
							{data && data.type_employments.map((i) => i.name).join(', ')}
						</Paragraph>
						<Paragraph variant='5' tag='p' className='print:hidden'>
							Командировки и переезд
						</Paragraph>
						<Paragraph variant='5' tag='p' className='print:hidden'>
							{`${getReadyMission()}, ${getReadyMove()}`}
						</Paragraph>
					</div>
					{data && data.skills ? (
						<>
							<Paragraph variant='4' tag='h2' className='font-bold mb-2 hidden print:block'>
								Профессиональные навыки
							</Paragraph>
							<div className='flex flex-wrap gap-2'>
								{data.skills.split(' ').map((i, num) => (
									<span key={num} className='py-1 px-2 bg-softGold rounded-[4px] print:px-0 print:py-0'>
										{i}
									</span>
								))}
							</div>
						</>
					) : ''}
				</div>
				<div className='pb-8 border-b-[1px] border-gray-80 print:border-none'>
					<div className='flex items-center gap-4 mb-3 print:hidden'>
						<Paragraph variant='1' tag='h2' className='font-semibold'>
							О себе
						</Paragraph>
						<Link href='/profile/about'>
							<a className='text-xs text-text font-semibold'>
								Редактировать
							</a>
						</Link>
					</div>
					<Paragraph variant='4' tag='h2' className='font-bold mb-2 hidden print:block'>
						Обо мне
					</Paragraph>
					<Paragraph variant='5' tag='p' className='max-w-[550px]'>
						{data && data.about}
					</Paragraph>
				</div>
				<div className='flex items-center gap-4 pb-8 border-b-[1px] border-gray-80 print:hidden'>
					<Paragraph variant='1' tag='h2' className='font-semibold'>
						{data && data.education ?`${EDUCATION[data.education]} образование` : 'Нет информации'}
					</Paragraph>
					<Link href='/profile/about'>
						<a className='text-xs text-text font-semibold'>
							Редактировать
						</a>
					</Link>
				</div>
				<div className='flex items-center gap-4 pb-8 border-b-[1px] border-gray-80 print:hidden'>
					<Paragraph variant='1' tag='h2' className='font-semibold'>
						Категории водительских прав:
						{' '}
						{data && data.driving_license}
					</Paragraph>
					<Link href='/profile/about'>
						<a className='text-xs text-text font-semibold'>
							Редактировать
						</a>
					</Link>
				</div>
			</div>
			<div className='grid gap-10 h-fit print:hidden'>
				<div className='grid rounded-xl border-[1px] border-gray-100'>
					<button className='p-4 grid grid-cols-[20px_1fr] gap-2 items-center border-b-[1px] border-gray-100'>
						<ShareSolidIcon className='fill-icon' />
						<Link href='/resumes/1'>
							<a target='_blank' className='text-text text-left text-sm'>
								Поделиться
							</a>
						</Link>
					</button>
					<button className='p-4 grid grid-cols-[20px_1fr] gap-2 items-center' onClick={() => print()}>
						<DownloadSolidIcon className='fill-icon' />
						<Paragraph variant='5' tag='p' className='text-text text-left'>
							Скачать резюме
						</Paragraph>
					</button>
				</div>
				<div className='flex justify-between items-start p-4 rounded-xl border-[1px] border-gray-100'>
					<div>
						<Paragraph variant='4' tag='p' className='font-semibold'>
							Видимость резюме
						</Paragraph>
						<Paragraph variant='6' tag='p' className='text-text-secondary'>
							{getVisionStatus()}
						</Paragraph>
					</div>
					<Switch id='switch' />
				</div>
				<div className='flex justify-between p-4 rounded-xl border-[1px] border-gray-100'>
					<div>
						<Paragraph variant='6' tag='p' className='text-text-secondary mb-1'>
							Просмотры
						</Paragraph>
						<Paragraph variant='4' tag='p' className='font-semibold'>
							{data && data.views}
						</Paragraph>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default ProfilePageUser;
