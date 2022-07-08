import Props from './ContactsModal.props';
import Paragraph from '../../components/Paragraph';
import { formatPhoneNumberIntl } from 'react-phone-number-input';

import CloseIcon from '../../assets/general/close.svg';
import PhoneIcon from '../../assets/communication/phone_solid.svg';
import MailIcon from '../../assets/communication/mail_solid.svg';

const ContactsModal: React.FC<Props> = ({ className = '', fullName, phone, mail, onClose, ...props }) => {
	return (
		<aside className={className + 'bg-white rounded-3xl p-6 w-[363px]'} {...props}>
			<div className='flex justify-between items-center'>
				<Paragraph variant='1' tag='h2' className='font-semibold'>
					{fullName}
				</Paragraph>
				<button onClick={onClose} className='scale-[1.1] fill-icon-secondary'>
					<CloseIcon />
				</button>
			</div>
			<div className='mt-6 grid grid-cols-[16px_1fr] gap-x-3 gap-y-[14px]'>
				<PhoneIcon className='fill-icon' />
				<Paragraph variant='5' tag='p' className='text-text'>
					<a href={`tel:${phone}`}>
						{formatPhoneNumberIntl(phone)}
					</a>
				</Paragraph>
				<MailIcon className='fill-icon' />
				<Paragraph variant='5' tag='p' className='text-text'>
					<a href={`mailto:${mail}`}>
						{mail}
					</a>
				</Paragraph>
			</div>
		</aside>
	);
};

export default ContactsModal;
