import Image from 'next/image';
import Paragraph from '../Paragraph';
import Props from './ProfileTab.props';
import { useState } from 'react';
import { useRouter } from 'next/router';

import CaretLeftIcon from '../../assets/arrows/caret_left.svg';

const ProfileTab: React.FC<Props> = ({ className = '', avatar, ...props }) => {
	const [showMenu, setShowMenu] = useState(false);

	const router = useRouter();

	return (
		<button
			onFocus={() => setShowMenu(true)}
			onBlur={() => setTimeout(() => setShowMenu(false), 20)}
			className={className + ' relative bg-gray-20 rounded-2xl p-2 grid gap-2 grid-flow-col items-center cursor-pointer'}
			{...props}
		>
			<Image
				src={avatar ? avatar : '/assets/default_avatar.svg'}
				width={32}
				height={32}
				className='object-cover'
				alt='avatar' />
			<Paragraph variant='5' tag='p' className='text-darkBlue'>
				Личный кабинет
			</Paragraph>
			<CaretLeftIcon className='-rotate-90 fill-darkBlue' />
			{showMenu && (
				<div
					className='absolute z-20 top-12 w-full grid bg-white rounded-b-2xl'
					style={{
						boxShadow: `0px 184px 74px rgba(35, 47, 59, 0.01), 0px 104px 62px rgba(35, 47, 59, 0.03),
							0px 46px 46px rgba(35, 47, 59, 0.04), 0px 12px 25px rgba(35, 47, 59, 0.05),
							0px 0px 0px rgba(35, 47, 59, 0.05)`,
					}}
				>
					<button
						className='p-4 w-full text-left border-b-[1px] border-button-secondary'
						onClick={() => router.push('/profile')}
					>
						<Paragraph variant='5' tag='span'>
							Мое резюме
						</Paragraph>
					</button>
					<button className='p-4 w-full text-left border-b-[1px] border-button-secondary'>
						<Paragraph variant='5' tag='span'>
							Мессенджер
						</Paragraph>
					</button>
					<button className='p-4 w-full text-left border-b-[1px] border-button-secondary'>
						<Paragraph variant='5' tag='span'>
							Настройки
						</Paragraph>
					</button>
					<button
						className='p-4 w-full text-left'
						onClick={() => {
							localStorage.removeItem('access_token');
							router.reload();
						}}
					>
						<Paragraph variant='5' tag='span' className='text-red'>
							Выход
						</Paragraph>
					</button>
				</div>
			)}
		</button>
	);
};

export default ProfileTab;
