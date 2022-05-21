import Props from './Message.props';

import DeliveredIcon from '../../assets/communication/delivered.svg';
import Paragraph from '../Paragraph';
import { format } from 'date-fns';
import getMessageStyles from './Message.styles';

const Message: React.FC<Props> = ({ className = '', label, message, sendedDate, sender, readed, showDate, ...props }) => {
	return (
		<div className={`${className} w-[363px] ${(sender === 'me' ? 'justify-self-end' : 'justify-self-start')}`}>
			<div className={'p-4 mb-2 rounded-xl ' + getMessageStyles(sender)} {...props}>
				<Paragraph variant='5' tag='p' className='text-inherit'>
					{label && (
						<>
							<span className='font-semibold text-inherit'>
								{label}
							</span>
							<br />
						</>
					)}
					{message}
				</Paragraph>
			</div>
			{showDate && (
				<div className='flex justify-end items-center gap-1'>
					{readed && (
						<DeliveredIcon className='fill-icon' />
					)}
					<Paragraph variant='6' tag='p'>
						{format(sendedDate, 'HH:mm')}
					</Paragraph>
				</div>
			)}
		</div>
	);
};

export default Message;
