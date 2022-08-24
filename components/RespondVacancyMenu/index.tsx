import { useFormik } from 'formik';
import Props from './RespondVacancyMenu.props';
import Paragraph from '../Paragraph';
import Link from 'next/link';
import Textarea from '../Textarea';
import Button from '../Button';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import Image from 'next/image';

import PreloaderIcon from '../../assets/loader.svg';
import CloseIcon from '../../assets/general/close.svg';
import CompanyIcon from '../../assets/company.svg';
import PhoneSolidIcon from '../../assets/communication/phone_solid.svg';
import MailSolidIcon from '../../assets/communication/mail_solid.svg';
import { useQuery } from 'react-query';
import { getMyProfileUser } from '../../shared/api/user';

const RespondVacancyMenu: React.FC<Props> = ({ className = '', companyName, companyAvatar, vacancyName, minPrice, vacancyId,
	contactName, contactPhone, contactMail, onContinue, onBack, isLoading, errorMessage, ...props }) => {
	const formik = useFormik({
		initialValues: {
			message: '',
			allowSendContacts: [],
		},
		onSubmit: (values) => {
			onContinue(values.message, !!values.allowSendContacts.length);
		},
	});

	const profileQuery = useQuery('my_profile_user', getMyProfileUser, {
		retryDelay: 2,
	});

	return (
		<aside className={className} {...props}>
			<div className='px-6 py-4 flex justify-between items-center border-b-[1px] border-button-secondary'>
				<Paragraph variant='1' tag='h2' className='font-semibold'>
					Отклик на вакансию
				</Paragraph>
				<button onClick={onBack}>
					<CloseIcon className='fill-icon-secondary' />
				</button>
			</div>
			<form onSubmit={formik.handleSubmit}>
				<div className='px-6 py-4 flex justify-between border-b-[1px] border-button-secondary'>
					<div className='grid gap-1'>
						<div className='grid grid-cols-[20px_auto] gap-2 items-center'>
							{companyAvatar ? (
								<Image
									className='object-cover rounded-full'
									src={companyAvatar}
									alt='company avatar'
									width={20}
									height={20} />
							) : (
								<CompanyIcon />
							)}
							<Paragraph variant='6' tag='p'>
								{companyName}
							</Paragraph>
						</div>
						<Paragraph variant='4' tag='p' className='font-semibold'>
							{vacancyName}
						</Paragraph>
						<Paragraph variant='4' tag='p' className='font-semibold'>
							от
							{' '}
							{new Intl.NumberFormat('ru-RU').format(minPrice)}
							<span className='font-rouble text-sm'>
								{'a'}
							</span>
						</Paragraph>
					</div>
					<Link href={{ pathname: `/vacancies/${vacancyId}` }}>
						<a target='_blank' className='text-xs text-text'>
							Открыть вакансию в новой вкладке
						</a>
					</Link>
				</div>
				<div className='px-6 py-4 border-b-[1px] border-button-secondary'>
					<Paragraph variant='5' tag='h3' className='font-semibold mb-3'>
						Контактное лицо
					</Paragraph>
					<Paragraph variant='5' tag='p' className='mb-2'>
						{contactName}
					</Paragraph>
					<div className='grid grid-cols-[20px_auto_20px_auto] gap-3 items-center'>
						<PhoneSolidIcon className='fill-icon' />
						<Paragraph variant='5' tag='p' className='text-text'>
							<a href={`tel:${contactPhone}`}>
								{formatPhoneNumberIntl(contactPhone)}
							</a>
						</Paragraph>
						<MailSolidIcon className='fill-icon' />
						<Paragraph variant='5' tag='p' className='text-text'>
							<a href={`mailto:${contactMail}`}>
								{contactMail}
							</a>
						</Paragraph>
					</div>
				</div>
				<div className='p-6 border-b-[1px] border-button-secondary'>
					<Paragraph variant='4' tag='p' className='mb-3'>
						Вы откликаетесь, как
						{` ${vacancyName} `}
						,
						<br />
						зарплата от
						{` ${new Intl.NumberFormat('ru-RU').format(minPrice)} `}
						<span className='font-rouble text-sm'>
							{'a'}
						</span>
					</Paragraph>
					<Textarea
						className='w-full h-[200px]'
						placeholder='Сообщение работодателю'
						name='message'
						value={formik.values.message}
						onChange={formik.handleChange}
					>

					</Textarea>
					{/*<Checkbox
						name='allowSendContacts'
						onChange={formik.handleChange}
						checked={!!formik.values.allowSendContacts.length}
						label='Предоставить контакты работодателю' />*/}
				</div>
				{errorMessage && (
					<Paragraph variant='5' tag='p' className='text-red font-semibold px-6 mt-3'>
						{errorMessage}
					</Paragraph>
				)}
				{profileQuery.isSuccess && profileQuery.data.payload.state !== 'active' ? (
					<Paragraph variant='5' tag='p' className='text-red font-semibold px-6 mt-3'>
						Ваше резюме ещё на модерации
					</Paragraph>
				) : ''}
				<div className='px-6 py-4 grid grid-cols-[auto_auto_1fr] gap-[10px]'>
					{isLoading && (
						<PreloaderIcon className='h-9 w-9 mx-5' />
					)}
					{!isLoading && profileQuery.data && profileQuery.data.payload.state === 'active' ? (
						<Button className='h-9 px-4'>
							Отправить отклик
						</Button>
					) : ''}
					<Button variant='secondary' type='button' className='h-9 px-4' onClick={onBack}>
						Отменить
					</Button>
				</div>
			</form>
		</aside>
	);
};

export default RespondVacancyMenu;
