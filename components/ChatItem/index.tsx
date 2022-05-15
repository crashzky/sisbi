import Props from './ChatItem.props';
import Image from 'next/image';
import Paragraph from '../Paragraph';
import { intervalToDuration } from 'date-fns';
import numberToText from '../../utils/numberToText';

import CompanyIcon from '../../assets/company.svg';
import DeliveredIcon from '../../assets/communication/delivered.svg';

const ChatItem: React.FC<Props> = ({ className = '', companionAvatar, companionName, lastMessageReadedDate, vacancyName,
	lastMessageSender, lastMessageValue, ...props }) => {
	function getReadedDateMessage() {
		const interval = intervalToDuration({
			start: lastMessageReadedDate,
			end: new Date(Date.now()),
		});

		const START_MESSAGE = 'Просмотренно';

		if(interval.years)
			return `${START_MESSAGE} ${interval.years} ${numberToText(interval.years, 'year')}`;
		else if(interval.months)
			return `${START_MESSAGE} ${interval.months} ${numberToText(interval.months, 'month')}`;
		else if(interval.weeks)
			return `${START_MESSAGE} ${interval.weeks} ${numberToText(interval.weeks, 'week')}`;
		else if(interval.days)
			return `${START_MESSAGE} ${interval.days} ${numberToText(interval.days, 'day')}`;
		else if(interval.hours)
			return `${START_MESSAGE} ${interval.hours} ${numberToText(interval.hours, 'hour')}`;
		else if(interval.minutes)
			return `${START_MESSAGE} ${interval.minutes} ${numberToText(interval.minutes, 'minute')}`;
		else if(interval.seconds)
			return START_MESSAGE;
		else
			return '';
	}
	
	function sliceMessage() {
		if(lastMessageValue.length >= 33)
			return lastMessageValue.slice(0, 30) + '...';
		else
			return lastMessageValue;
	}

	return (
		<button className={className + ' w-full border-b-[1px] border-[#ECEDF0] py-3 pl-4 pr-5'} {...props}>
			<div className='grid grid-cols-[20px_auto_1fr_auto_16px] gap-2 items-center'>
				{companionAvatar ? (
					<Image
						src={companionAvatar}
						width={20}
						height={20}
						className='object-cover rounded-full'
						alt='companion avatar' />
				) : (
					<CompanyIcon />
				)}
				<Paragraph variant='6' tag='p' className='text-text'>
					{companionName}
				</Paragraph>
				<div></div>
				{lastMessageReadedDate && (
					<>
						<Paragraph variant='6' tag='p' className='text-text'>
							{getReadedDateMessage()}
						</Paragraph>
						<DeliveredIcon className='fill-icon' />
					</>
				)}
			</div>
			<Paragraph variant='4' tag='p' className='mt-[6px] text-left font-semibold'>
				{vacancyName}
			</Paragraph>
			<Paragraph variant='5' tag='p' className='mt-1 text-text-secondary text-left opacity-70'>
				{lastMessageSender === 'me' ? 'Вы' : companionName}
				{': '}
				<span className='opacity-100'>
					{lastMessageValue ? sliceMessage() : 'Чат создан'}
				</span>
			</Paragraph>
		</button>
	);
};

export default ChatItem;
