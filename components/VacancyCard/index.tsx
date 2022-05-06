import Image from 'next/image';
import Props from './VacancyCard.props';
import Paragraph from '../Paragraph';
import Button from '../Button';
import { useState } from 'react';

import CompanyIcon from '../../assets/company.svg';
import CloseIcon from '../../assets/general/close.svg';
import PhoneIcon from '../../assets/communication/phone_solid.svg';
import MailIcon from '../../assets/communication/mail_solid.svg';
import { formatPhoneNumberIntl } from 'react-phone-number-input';

const VacancyCard: React.FC<Props> = ({ className = '', imageSrc, companyName, label, minPrice, description, tags,
	contactName, contactPhone, contactMail, onRespond, ...props }) => {
	const [showContacts, setShowContacts] = useState(false);

	return (
		<article
			className={className
				+ ' border-[1px] cursor-pointer border-gray-100 p-4 grid grid-cols-[156px_1fr] gap-8'}
			{...props}
		>
			<div>
				<Image
					src={imageSrc}
					className='object-cover'
					width={156}
					height={156}
					alt='vacancy' />
			</div>
			<div>
				<div className='flex gap-2 mb-3'>
					<CompanyIcon />
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
					{' ₽'}
				</Paragraph>
				<Paragraph variant='6' tag='p' className='mb-3'>
					{description}
				</Paragraph>
				<div className='flex gap-2 mb-6'>
					{tags.map((i, num) => (
						<span key={num} className='s bg-softGold py-0.5 px-1 rounded-[4px]'>
							{i}
						</span>
					))}
				</div>
				<div className='grid grid-cols-[121px_155px_1fr] gap-2'>
					<Button
						variant='outline_secondary'
						size='S'
						className='w-[121px] h-9'
						onClick={onRespond}
					>
						Откликнуться
					</Button>
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
										{formatPhoneNumberIntl(`+7${contactPhone}`)}
									</Paragraph>
									<MailIcon className='fill-darkBlue' />
									<Paragraph variant='5' tag='p' className='text-text'>
										{contactMail}
									</Paragraph>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</article>
	);
};

export default VacancyCard;
