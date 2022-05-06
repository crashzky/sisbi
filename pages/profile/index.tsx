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

import ShareSolidIcon from '../../assets/communication/share_solid.svg';
import DownloadSolidIcon from '../../assets/general/download_solid.svg';

const ProfilePage = (): JSX.Element => {
	const router = useRouter();

	const birthdayInterval = intervalToDuration({
		start: new Date(2005, 1, 18),
		end: new Date(Date.now()),
	});

	const birthday_date = format(new Date(2005, 0, 18), 'dd MMMM yyyy', {
		locale: ru,
	});

	useEffect(() => {
		if(!localStorage.getItem('access_token'))
			router.push('/?modal=login');
	}, [router]);

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
								Алексей Сухоруков
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
								{`${birthdayInterval.years} лет, ${birthday_date}`}
							</Paragraph>
							<Paragraph variant='3' tag='p' className='mb-3'>
								Новосибирск
							</Paragraph>
							<Paragraph variant='3' tag='p' className='mb-1'>
								{formatPhoneNumberIntl('+79223743745')}
							</Paragraph>
							<Paragraph variant='3' tag='p' className='mb-1'>
								mail@mail.ru
							</Paragraph>
						</div>

						<div className='hidden print:block'>
							{/* For print */}
							<Paragraph variant='3' tag='p' className='mb-1'>
								{`Мужчина, ${birthdayInterval.years} лет, родился ${birthday_date}`}
							</Paragraph>
							<Paragraph variant='3' tag='p' className='mb-3'>
								Новосибирск, не готов к переезду, не готов к командировкам
							</Paragraph>

							<Paragraph variant='4' tag='p' className='font-bold mt-8 mb-2'>
								Контакты
							</Paragraph>
							<Paragraph variant='3' tag='p' className='mb-1'>
								{'Мобильный телефон: ' + formatPhoneNumberIntl('+79223743745')}
							</Paragraph>
							<Paragraph variant='3' tag='p' className='mb-1'>
								Почта: mail@mail.ru
							</Paragraph>

							<Paragraph variant='4' tag='p' className='font-bold mt-4.5'>
								Образование
							</Paragraph>
							<Paragraph variant='3' tag='p' className='mb-1'>
								Неполное высшее
							</Paragraph>
						</div>
					</div>
					<Image
						width={173}
						height={220}
						className='object-cover rounded-2xl print:rounded-none'
						src='/assets/DEV_ONLY.png'
						alt='avatar' />
				</div>
				<div className='pb-8 border-b-[1px] border-gray-80 print:border-none print:pb-0'>
					<div className='flex items-center gap-4 mb-1'>
						<Paragraph variant='1' tag='h2' className='font-semibold'>
							Junior UI/UX дизайнер
						</Paragraph>
						<Link href='/profile/resume'>
							<a className='text-xs text-text font-semibold print:hidden'>
								Редактировать
							</a>
						</Link>
					</div>
					<Paragraph variant='3' tag='p' className='font-semibold mb-3'>
						Зарплата от 150 000 ₽
					</Paragraph>
					<Paragraph variant='5' tag='p' className='text-text-secondary mb-4 print:hidden'>
						Дизайн, искусство, развлечения
					</Paragraph>
					<div className='grid grid-cols-[repeat(2,auto)] gap-y-7 gap-x-3 print:gap-y-0  w-fit mb-4'>
						<Paragraph variant='5' tag='p'>
							Опыт работы
						</Paragraph>
						<Paragraph variant='5' tag='p'>
							без опыта
						</Paragraph>
						<Paragraph variant='5' tag='p'>
							Тип занятости
						</Paragraph>
						<Paragraph variant='5' tag='p'>
							удаленная работа, частичная занятость
						</Paragraph>
						<Paragraph variant='5' tag='p'>
							График работы
						</Paragraph>
						<Paragraph variant='5' tag='p'>
							полный рабочий день, гибкий график
						</Paragraph>
						<Paragraph variant='5' tag='p' className='print:hidden'>
							Командировки и переезд
						</Paragraph>
						<Paragraph variant='5' tag='p' className='print:hidden'>
							не готов к командировкам, не готов к переезду	
						</Paragraph>
					</div>
					<Paragraph variant='4' tag='h2' className='font-bold mb-2 hidden print:block'>
						Профессиональные навыки
					</Paragraph>
					<div className='flex flex-wrap gap-2'>
						{['Figma', 'Web-дизайн', 'Графический дизайн', 'iOS', 'Photoshop/ILLustrator'].map((i, num) => (
							<span key={num} className='py-1 px-2 bg-softGold rounded-[4px] print:px-0 print:py-0'>
								{i}
							</span>
						))}
					</div>
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
					<Paragraph variant='5' tag='p'>
						Lorem Ipsum - это текст-рыбка, часто используемый в печати и вэб-дизайне.
						Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века.
						В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов,
						используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без
						заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое
						время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время,
						программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
					</Paragraph>
				</div>
				<div className='flex items-center gap-4 pb-8 border-b-[1px] border-gray-80 print:hidden'>
					<Paragraph variant='1' tag='h2' className='font-semibold'>
						Неполное высшее образование
					</Paragraph>
					<Link href='/profile/about'>
						<a className='text-xs text-text font-semibold'>
							Редактировать
						</a>
					</Link>
				</div>
				<div className='flex items-center gap-4 pb-8 border-b-[1px] border-gray-80 print:hidden'>
					<Paragraph variant='1' tag='h2' className='font-semibold'>
						Категории водительских прав: A
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
						<Paragraph variant='5' tag='p' className='text-text text-left'>
							Поделиться
						</Paragraph>
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
							Сейчас это резюме никому не видно
						</Paragraph>
					</div>
					<Switch id='switch' />
				</div>
				<div className='flex justify-between p-4 rounded-xl border-[1px] border-gray-100'>
					<div>
						<Paragraph variant='6' tag='p' className='text-text-secondary mb-1'>
							Показы
						</Paragraph>
						<Paragraph variant='4' tag='p' className='font-semibold'>
							324
						</Paragraph>
					</div>
					<div className='h-full border-r-[1px] border-gray-100'></div>
					<div>
						<Paragraph variant='6' tag='p' className='text-text-secondary mb-1'>
							Просмотры
						</Paragraph>
						<Paragraph variant='4' tag='p' className='font-semibold'>
							324
						</Paragraph>
					</div>
					<div className='h-full border-r-[1px] border-gray-100'></div>
					<div>
						<Paragraph variant='6' tag='p' className='text-text-secondary mb-1'>
							Приглашений
						</Paragraph>
						<Paragraph variant='4' tag='p' className='font-semibold'>
							324
						</Paragraph>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default ProfilePage;
