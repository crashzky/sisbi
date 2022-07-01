import Props from './ChatItem.props';
import Image from 'next/image';
import Paragraph from '../Paragraph';
import { intervalToDuration } from 'date-fns';
import numberToText from '../../utils/numberToText';
import { useRouter } from 'next/router';

import CompanyIcon from '../../assets/company.svg';
import DeliveredIcon from '../../assets/communication/delivered.svg';

const ChatItem: React.FC<Props> = ({ className = '', companionAvatar, companionName, lastMessageReadedDate, vacancyName,
	lastMessageSender, lastMessageValue, chatId, onClick, ...props }) => {
	const router = useRouter();

	const isActiveChat = router.query && router.query.id === chatId.toString();

	function getReadedDateMessage() {
		const interval = intervalToDuration({
			start: lastMessageReadedDate,
			end: new Date(Date.now()),
		});

		const START_MESSAGE = 'Просмотренно';
		const END_MESSAGE = 'назад';

		if(interval.years)
			return `${START_MESSAGE} ${interval.years} ${numberToText(interval.years, 'year')} ${END_MESSAGE}`;
		else if(interval.months)
			return `${START_MESSAGE} ${interval.months} ${numberToText(interval.months, 'month')} ${END_MESSAGE}`;
		else if(interval.weeks)
			return `${START_MESSAGE} ${interval.weeks} ${numberToText(interval.weeks, 'week')} ${END_MESSAGE}`;
		else if(interval.days)
			return `${START_MESSAGE} ${interval.days} ${numberToText(interval.days, 'day')} ${END_MESSAGE}`;
		else if(interval.hours)
			return `${START_MESSAGE} ${interval.hours} ${numberToText(interval.hours, 'hour')} ${END_MESSAGE}`;
		else if(interval.minutes)
			return `${START_MESSAGE} ${interval.minutes} ${numberToText(interval.minutes, 'minute')} ${END_MESSAGE}`;
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
		<button
			className={className + ' w-full border-b-[1px] border-gray-60 py-3 pl-4 pr-5'}
			style={{
				backgroundColor: isActiveChat ? '#3390EC' : 'white',
			}}
			onClick={(e) => {
				router.push(`/messenger/${chatId}`);

				if(onClick)
					onClick(e);
			}}
			{...props}
		>
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
				<Paragraph variant='6' tag='p' className={isActiveChat ? 'text-white' : 'text-text'}>
					{companionName}
				</Paragraph>
				<div></div>
				{lastMessageReadedDate && (
					<>
						<Paragraph variant='6' tag='p' className={isActiveChat ? 'text-white' : 'text-text'}>
							{getReadedDateMessage()}
						</Paragraph>
						<DeliveredIcon className={isActiveChat ? 'fill-white' : 'fill-icon'} />
					</>
				)}
			</div>
			<Paragraph
				variant='4'
				tag='p'
				className={'mt-[6px] text-left font-semibold ' + (isActiveChat ? 'text-white' : '')}
			>
				{vacancyName}
			</Paragraph>
			<div className='flex justify-between items-center'>
				<Paragraph
					variant='5'
					tag='p'
					className={'mt-1 text-text-secondary text-left ' + (isActiveChat ? 'text-white' : 'opacity-70')}
				>
					{lastMessageSender === 'me' ? 'Вы' : companionName}
					{': '}
					<span className={isActiveChat ? 'text-white' : 'opacity-100'}>
						{lastMessageValue ? sliceMessage() : 'Чат создан'}
					</span>
				</Paragraph>
				{(!lastMessageReadedDate && lastMessageSender === 'companion') && (
					<div className='w-[22px] h-[22px] rounded-full bg-lightBlue text-white font-semibold'>
						!
					</div>
				)}
			</div>
		</button>
	);
};

export default ChatItem;
