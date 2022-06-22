import Image from 'next/image';
import Props from './VacancyCard.props';
import Paragraph from '../Paragraph';
import Button from '../Button';
import { useState } from 'react';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import RateButton from '../RateButton';
import useUserType from '../../hooks/useUserType';

import CompanyIcon from '../../assets/company.svg';
import CloseIcon from '../../assets/general/close.svg';
import PhoneIcon from '../../assets/communication/phone_solid.svg';
import MailIcon from '../../assets/communication/mail_solid.svg';

const VacancyCard: React.FC<Props> = ({ className = '', imageSrc, companyName, label, minPrice, description, tags,
	contactName, contactPhone, contactMail, companyAvatar, onRespond, isFavorited, onAddToFavorites, onRemoveFromFavorited,
	...props }) => {
	const { userType } = useUserType();

	const [showContacts, setShowContacts] = useState(false);
	const [_isFavorited, setIsFavorited] = useState(isFavorited);

	return (
		<article
			className={className
				+ ' border-[1px] cursor-pointer border-gray-100 p-4 grid gap-8 '
				+ (imageSrc ? 'grid-cols-[156px_1fr]' : '')}
			{...props}
		>
			{imageSrc && (
				<div>
					<Image
						src={imageSrc}
						className='object-cover rounded-3xl'
						width={156}
						height={156}
						alt='vacancy' />
				</div>
			)}
			<div>
				<div className='grid grid-flow-col w-fit items-center gap-2 mb-3'>
					{companyAvatar ? (
						<Image
							width={20}
							height={20}
							alt='Company'
							className='object-cover rounded-full'
							src={companyAvatar} />
					) : (
						<CompanyIcon />
					)}
					<Paragraph variant='6' tag='p' className='text-text'>
						{companyName}
					</Paragraph>
				</div>
				<Paragraph variant='1' tag='h2' className='font-bold mb-1'>
					{label}
				</Paragraph>
				<Paragraph variant='1' tag='p' className='font-bold text-text mb-3'>
					от
					{' '}
					{new Intl.NumberFormat('ru-RU').format(minPrice)}
					<span className='font-rouble text-xl text-text'>
						{'c'}
					</span>
				</Paragraph>
				<Paragraph variant='6' tag='p' className='mb-3'>
					{description}
				</Paragraph>
				<div className='flex flex-wrap gap-2 mb-6'>
					{tags.map((i, num) => (
						<span key={num} className='s bg-softGold py-0.5 px-1 rounded-[4px]'>
							{i}
						</span>
					))}
				</div>
				<div className='grid grid-cols-[121px_155px_1fr_auto] gap-2'>
					{localStorage.getItem('user_type') === 'user' && (
						<Button
							variant='outline_secondary'
							size='S'
							className='w-[121px] h-9'
							onClick={onRespond}
						>
							Откликнуться
						</Button>
					)}
					<div className='relative'>
						<Button
							variant={showContacts ? 'secondary' : 'outline_secondary'}
							size='S'
							className='w-[155px] h-9'
							onClick={() => setShowContacts((prev) => !prev)}
						>
							Показать контакты
						</Button>
						{showContacts && (
							<div
								className='absolute top-10 w-[314px] bg-[#FAFBFC] p-4 rounded-xl'
								style={{
									boxShadow: `0px 80px 32px rgba(35, 47, 59, 0.01), 0px 45px 27px
									rgba(35, 47, 59, 0.03), 0px 20px 20px rgba(35, 47, 59, 0.04),
									0px 5px 11px rgba(35, 47, 59, 0.05), 0px 0px 0px rgba(35, 47, 59, 0.05)`,
								}}
							>
								<div className='flex justify-between items-center mb-4'>
									<Paragraph variant='4' tag='p' className='font-semibold'>
										{contactName}
									</Paragraph>
									<button onClick={() => setShowContacts(false)}>
										<CloseIcon className='fill-icon-secondary' />
									</button>
								</div>
								<div className='grid grid-cols-[16px_1fr] gap-x-4 gap-y-[10px] items-center'>
									<PhoneIcon className='fill-darkBlue' />
									<Paragraph variant='5' tag='p' className='text-text'>
										{formatPhoneNumberIntl(contactPhone)}
									</Paragraph>
									<MailIcon className='fill-darkBlue' />
									<Paragraph variant='5' tag='p' className='text-text'>
										{contactMail}
									</Paragraph>
								</div>
							</div>
						)}
					</div>
					<div></div>
					{userType === 'user' && (
						<RateButton
							isActive={_isFavorited}
							onClick={() => {
								if(_isFavorited)
									onRemoveFromFavorited();
								else
									onAddToFavorites();

								setIsFavorited((prev) => !prev);
							}} />
					)}
				</div>
			</div>
		</article>
	);
};

export default VacancyCard;
