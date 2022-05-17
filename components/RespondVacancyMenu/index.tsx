import { useFormik } from 'formik';
import Props from './RespondVacancyMenu.props';
import Paragraph from '../Paragraph';
import Link from 'next/link';
import Textarea from '../Textarea';
import Checkbox from '../Checkbox';
import Button from '../Button';
import { useRouter } from 'next/router';
import { formatPhoneNumberIntl } from 'react-phone-number-input';

import CloseIcon from '../../assets/general/close.svg';
import CompanyIcon from '../../assets/company.svg';
import PhoneSolidIcon from '../../assets/communication/phone_solid.svg';
import MailSolidIcon from '../../assets/communication/mail_solid.svg';

const RespondVacancyMenu: React.FC<Props> = ({ className = '', companyName, vacancyName, minPrice, vacancyId,
	contactName, contactPhone, contactMail, onContinue, onBack, ...props }) => {
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			message: '',
			allowSendContacts: [],
		},
		onSubmit: (values) => {
			onContinue(values.message, !!values.allowSendContacts.length);
		},
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
							<CompanyIcon />
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
					<Link href={{
						pathname: `/vacancies/${vacancyId}`,
						query: router.query,
					}}
					>
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
							{formatPhoneNumberIntl(contactPhone)}
						</Paragraph>
						<MailSolidIcon className='fill-icon' />
						<Paragraph variant='5' tag='p' className='text-text'>
							{contactMail}
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
						className='w-full h-[200px] mb-3'
						placeholder='Сообщение работодателю'
						name='message'
						value={formik.values.message}
						onChange={formik.handleChange}
					>

					</Textarea>
					<Checkbox
						name='allowSendContacts'
						onChange={formik.handleChange}
						checked={!!formik.values.allowSendContacts.length}
						label='Предоставить контакты работодателю' />
				</div>
				<div className='px-6 py-4 grid grid-cols-[auto_auto_1fr] gap-[10px]'>
					<Button className='h-9 px-4'>
						Отправить отклик
					</Button>
					<Button variant='secondary' type='button' className='h-9 px-4' onClick={onBack}>
						Отменить
					</Button>
				</div>
			</form>
		</aside>
	);
};

export default RespondVacancyMenu;
