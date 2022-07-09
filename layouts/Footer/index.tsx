import Link from 'next/link';
import { useRouter } from 'next/router';
import { FOOTER_ITEMS } from '../../shared/consts/footer';
import Props from './Footer.props';
import { format } from 'date-fns';
import { useState } from 'react';
import Paragraph from '../../components/Paragraph';

import FullLogoSmallIcon from '../../assets/full-logo-small.svg';
import AppStoreIcon from '../../assets/app-store.svg';
import GooglePlayIcon from '../../assets/google-play.svg';
import CloseIcon from '../../assets/general/close.svg';
import PhoneIcon from '../../assets/communication/phone_solid.svg';
import MailIcon from '../../assets/communication/mail_solid.svg';
import { formatPhoneNumberIntl } from 'react-phone-number-input';

const Footer: React.FC<Props> = ({ className = '', ...props }) => {
	const router = useRouter();

	const [contactsIsActive, setContactsIsActive] = useState(false);

	return (
		<footer className={className + ' '} {...props}>
			<div className='flex justify-between'>
				{FOOTER_ITEMS.map((i, num) => (
					<div key={num} className='flex flex-col items-start'>
						<p className='text-sm font-semibold text-text-secondary mb-4'>
							{i.title}
						</p>
						{i.items.map((j, num2) => (
							<div key={num2} className='relative'>
								<button
									className='text-text text-sm mb-2'
									onClick={() => {
										if(j.title === 'Контакты')
											setContactsIsActive((prev) => !prev);
										else if(j.href)
											router.push(j.href);
										if(j.onClick)
											j.onClick();
									}}
								>
									{j.title}
								</button>
								{contactsIsActive && j.title === 'Контакты' ? (
									<div
										className='absolute z-10 top-10 w-[314px] bg-[#FAFBFC] p-4 rounded-xl'
										style={{
											boxShadow: `0px 80px 32px rgba(35, 47, 59, 0.01), 0px 45px 27px
											rgba(35, 47, 59, 0.03), 0px 20px 20px rgba(35, 47, 59, 0.04),
											0px 5px 11px rgba(35, 47, 59, 0.05), 0px 0px 0px rgba(35, 47, 59, 0.05)`,
										}}
									>
										<div className='flex justify-between items-center mb-4'>
											<Paragraph variant='4' tag='p' className='font-semibold'>
												Контакты
											</Paragraph>
											<button onClick={() => setContactsIsActive(false)}>
												<CloseIcon className='fill-icon-secondary' />
											</button>
										</div>
										<div className='grid grid-cols-[16px_1fr] gap-x-4 gap-y-[10px] items-center'>
											<PhoneIcon className='fill-darkBlue' />
											<Paragraph variant='5' tag='p' className='text-text'>
												<a href='tel:+79100841996'>
													{formatPhoneNumberIntl('+79100841996')}
												</a>
											</Paragraph>
											<MailIcon className='fill-darkBlue' />
											<Paragraph variant='5' tag='p' className='text-text'>
												<a href='mailto:sisbi.rec@gmail.com'>
													sisbi.rec@gmail.com
												</a>
											</Paragraph>
										</div>
									</div>
								) : ''}
							</div>
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
			<div className='mt-16 grid grid-flow-col w-fit items-center gap-8'>
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
