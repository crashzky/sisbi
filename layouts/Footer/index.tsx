import Link from 'next/link';
import { useRouter } from 'next/router';
import { FOOTER_ITEMS } from '../../shared/consts/footer';
import Props from './Footer.props';
import { format } from 'date-fns';

import FullLogoSmallIcon from '../../assets/full-logo-small.svg';
import AppStoreIcon from '../../assets/app-store.svg';
import GooglePlayIcon from '../../assets/google-play.svg';

const Footer: React.FC<Props> = ({ className = '', ...props }) => {
	const router = useRouter();

	return (
		<footer className={className + ' '} {...props}>
			<div className='flex justify-between'>
				{FOOTER_ITEMS.map((i, num) => (
					<div key={num} className='flex flex-col items-start'>
						<p className='text-sm font-semibold text-text-secondary mb-4'>
							{i.title}
						</p>
						{i.items.map((j, num2) => (
							<button
								className='text-text text-sm mb-2'
								key={num2}
								onClick={() => {
									if(j.href)
										router.push(j.href);
									if(j.onClick)
										j.onClick();
								}}
							>
								{j.title}
							</button>
						))}
					</div>
				))}
				<div className='flex flex-col items-start'>
					<p className='text-sm font-semibold text-text-secondary mb-4'>
						Мобильное приложение
					</p>
					<button className='mb-2'>
						<AppStoreIcon />
					</button>
					<button>
						<GooglePlayIcon />
					</button>
				</div>
			</div>
			<div className='mt-16 flex gap-8 items-center'>
				<Link href='/'>
					<a>
						<FullLogoSmallIcon />
					</a>
				</Link>
				<p className='text-text-secondary text-xs'>
					©
					{' '}
					{format(new Date(Date.now()), 'yyyy')}
					{' '}
					SISBI. Все права защищены.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
