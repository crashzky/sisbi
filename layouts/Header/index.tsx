import Props from './Header.props';
import Link from 'next/link';

import FullLogoIcon from '../../assets/full-logo.svg';
import SolidFlashIcon from '../../assets/custom/solid_flash.svg';
import { useRouter } from 'next/router';
import ProfileTab from '../../components/ProfileTab';

const Header: React.FC<Props> = ({ className = '', items = [], userData, ...props }) => {
	const router = useRouter();

	return (
		<header className={className + ' grid grid-cols-[auto_auto_1fr_auto] gap-12 items-center'} {...props}>
			<Link href='/'>
				<a>
					<FullLogoIcon />
				</a>
			</Link>
			<nav className='flex gap-6'>
				{items.map((i, num) => (
					<Link href={i.href} key={num}>
						<a className='text-text-secondary text-sm hover:text-text hover:font-semibold'>
							{i.title}
						</a>
					</Link>
				))}
			</nav>
			<div></div>
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
