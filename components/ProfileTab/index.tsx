import Image from 'next/image';
import Paragraph from '../Paragraph';
import Props from './ProfileTab.props';
import { useState } from 'react';
import { useRouter } from 'next/router';

import CaretLeftIcon from '../../assets/arrows/caret_left.svg';
import useProfileTab from '../../hooks/useProfileTab';
import { MAIN_SHADOW } from '../../shared/consts/shadows';

const ProfileTab: React.FC<Props> = ({ className = '', avatar, ...props }) => {
	const router = useRouter();

	const menuItems = useProfileTab();
	
	const [showMenu, setShowMenu] = useState(false);

	return (
		<div className={className + ' relative'}>
			<input
				className='w-full h-full absolute opacity-0 z-10 cursor-pointer'
				onFocus={() => setShowMenu(true)}
				onBlur={() => setShowMenu(false)}
				{...props} />
			<div className='bg-gray-20 rounded-2xl p-2 grid gap-2 grid-flow-col items-center cursor-pointer'>
				<Image
					src={avatar ? avatar : '/assets/default_avatar.svg'}
					width={32}
					height={32}
					className='object-cover rounded-full'
					alt='avatar' />
				<Paragraph variant='5' tag='p' className='text-darkBlue'>
					Личный кабинет
				</Paragraph>
				<CaretLeftIcon className='-rotate-90 fill-darkBlue' />
			</div>
			{showMenu && (
				<div
					className='absolute z-20 top-12 w-full grid bg-white rounded-b-2xl'
					style={{
						boxShadow: MAIN_SHADOW,
					}}
				>
					{menuItems.map((i, num) => (
						<button
							key={num}
							className='p-4 w-full text-left border-b-[1px] border-button-secondary'
							onMouseDown={i.onClick}
						>
							<Paragraph variant='5' tag='span'>
								{i.title}
							</Paragraph>
						</button>
					))}
					<button
						className='p-4 w-full text-left'
						onMouseDown={() => {
							localStorage.removeItem('access_token');
							localStorage.removeItem('user_type');

							router.reload();
						}}
					>
						<Paragraph variant='5' tag='span' className='text-red'>
							Выход
						</Paragraph>
					</button>
				</div>
			)}
		</div>
	);
};

export default ProfileTab;
