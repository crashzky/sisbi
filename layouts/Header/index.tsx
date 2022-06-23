import Props from './Header.props';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ProfileTab from '../../components/ProfileTab';
import { useMutation } from 'react-query';
import useUserType from '../../hooks/useUserType';
import { getChats, getChatsEmployer } from '../../shared/api/messenger';

import FullLogoIcon from '../../assets/full-logo.svg';
import SolidFlashIcon from '../../assets/custom/solid_flash.svg';
import ChatIcon from '../../assets/communication/chat.svg';
import RateIcon from '../../assets/general/rate.svg';
import { IUserResponse } from '../../shared/types/api/user';

const Header: React.FC<Props> = ({ className = '', items = [], userData, ...props }) => {
	const router = useRouter();

	const [newMessagesCount, setNewMessagesCount] = useState(0);

	const { userType } = useUserType();

	const { mutate } = useMutation(userType === 'employer' ? getChatsEmployer : getChats, {
		onSuccess: (data) => {
			setNewMessagesCount((prev) => {
				const filteredPayload = data.payload.filter((i) =>
					!i.last_message.seen
					&& i.last_message.sender_type.toLowerCase() !== userType);
					
				return prev + filteredPayload.length;
			});

			if(data.total_pages > data.current_page)
				mutate({ page: data.current_page + 1 });
		},
	});

	useEffect(() => {
		if(userType) {
			mutate({
				page: 1,
			});	
		}
	}, [userType]);

	return (
		<header className={className + ' grid grid-cols-[auto_auto_1fr_auto_auto] gap-12 items-center'} {...props}>
			<Link href='/'>
				<a>
					<FullLogoIcon />
				</a>
			</Link>
			<nav className='grid grid-flow-col w-fit gap-6'>
				{items.map((i, num) => (
					<Link href={i.href} key={num}>
						<a className='text-text-secondary text-sm hover:text-text hover:font-semibold'>
							{i.title}
						</a>
					</Link>
				))}
			</nav>
			<div></div>
			{userData && (
				<div className='grid grid-flow-col gap-8 items-center'>
					<button onClick={() => router.push('/messenger')} className='relative'>
						{!!newMessagesCount && (
							<div
								className={`bg-red rounded-full border-[1px] border-white px-1 py-0.5 text-white font-semibold
								text-xs absolute left-[7px] -top-[9px] min-w-[22px]`}
							>
								{newMessagesCount}
							</div>
						)}
						<ChatIcon className='fill-icon-secondary' />
					</button>
					<button onClick={() => router.push('/favorites')}>
						<RateIcon className='fill-icon-secondary' />
					</button>
				</div>
			)}
			{!userData ? (
				<div>
					<button
						className='mr-8'
						onClick={() => {
							router.push({
								pathname: '/',
								query: {
									modal: 'login',
								},
							});
						}}
					>
						Войти
					</button>
					<button
						className='font-semibold text-sm text-text'
						onClick={() => {
							router.push({
								pathname: '/',
								query: {
									modal: 'signup',
								},
							});
						}}
					>
						<SolidFlashIcon className='fill-text inline-block mr-1' />
						Регистрация
					</button>
				</div>
			) : (
				<ProfileTab avatar={userData.payload.avatar} />
			)}
		</header>
	);
};

export default Header;
