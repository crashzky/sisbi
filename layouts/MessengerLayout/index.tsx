import { useEffect, useState } from 'react';
import ChatItem from '../../components/ChatItem';
import CustomSelect from '../../components/CustomSelect';
import InputSearch from '../../components/InputSearch';
import Paragraph from '../../components/Paragraph';
import MainLayout from '../MainLayout';
import Props from './MessengerLayout.props';

const MessengerLayout: React.FC<Props> = ({ className, children }) => {
	const [selectedMenuItem, setSelectedMenuItem] = useState({ label: 'Все отклики', value: 'Все отклики' });

	useEffect(() => {
		document.body.style.overflowY = 'hidden';
	}, []);

	return (
		<MainLayout
			className='px-40 h-[calc(100vh_-_96px)] bg-[#FAFBFC] grid grid-cols-[363px_1fr]'
			withFooter={false}
			headerClassname='border-b-[1px] border-gray-60'
		>
			<div className='bg-white border-x-[1px] border-gray-60'>
				<div className='p-4 border-b-[1px] border-gray-60'>
					<InputSearch
						placeholder='Название вакансии, компании' />
					<div className='flex justify-between items-center mt-4'>
						<Paragraph variant='6' tag='p' className='text-text-secondary'>
							Показывать:
						</Paragraph>
						<CustomSelect
							value={selectedMenuItem}
							onChange={setSelectedMenuItem}
							options={[
								{ label: 'Все отклики', value: 'Все отклики' },
								{ label: 'Приглашения', value: 'Приглашения' },
								{ label: 'В ожидании', value: 'В ожидании' },
								{ label: 'Отказ', value: 'Отказ' },
							]} />
					</div>
				</div>
				<div className='grid items-start h-fit max-h-[calc(100vh_-_250px)] overflow-y-scroll'>
					<ChatItem
						chatId={1}
						companionAvatar=''
						companionName='Рич Фэмили'
						vacancyName='UI/UX дизайнер'
						lastMessageReadedDate={new Date(2022, 0, 18)}
						lastMessageSender='me'
						lastMessageValue='Здравствуйте! Я бы хотел работать в вашей компании' />
					<ChatItem
						chatId={2}
						companionAvatar=''
						companionName='Рич Фэмили'
						vacancyName='UI/UX дизайнер'
						lastMessageReadedDate={new Date(2022, 0, 18)}
						lastMessageSender='me'
						lastMessageValue='Здравствуйте! Я бы хотел работать в вашей компании' />
					<ChatItem
						chatId={3}
						companionAvatar=''
						companionName='Рич Фэмили'
						vacancyName='UI/UX дизайнер'
						lastMessageReadedDate={new Date(2022, 0, 18)}
						lastMessageSender='me'
						lastMessageValue='Здравствуйте! Я бы хотел работать в вашей компании' />
					<ChatItem
						chatId={4}
						companionAvatar=''
						companionName='Рич Фэмили'
						vacancyName='UI/UX дизайнер'
						lastMessageReadedDate={new Date(2022, 0, 18)}
						lastMessageSender='me'
						lastMessageValue='Здравствуйте! Я бы хотел работать в вашей компании' />
					<ChatItem
						chatId={5}
						companionAvatar=''
						companionName='Рич Фэмили'
						vacancyName='UI/UX дизайнер'
						lastMessageReadedDate={new Date(2022, 0, 18)}
						lastMessageSender='me'
						lastMessageValue='Здравствуйте! Я бы хотел работать в вашей компании' />
					<ChatItem
						chatId={6}
						companionAvatar=''
						companionName='Рич Фэмили'
						vacancyName='UI/UX дизайнер'
						lastMessageReadedDate={new Date(2022, 0, 18)}
						lastMessageSender='me'
						lastMessageValue='Здравствуйте! Я бы хотел работать в вашей компании' />
					<ChatItem
						chatId={7}
						companionAvatar=''
						companionName='Рич Фэмили'
						vacancyName='UI/UX дизайнер'
						lastMessageReadedDate={new Date(2022, 0, 18)}
						lastMessageSender='me'
						lastMessageValue='Здравствуйте! Я бы хотел работать в вашей компании' />
					<ChatItem
						chatId={8}
						companionAvatar=''
						companionName='Рич Фэмили'
						vacancyName='UI/UX дизайнер'
						lastMessageReadedDate={new Date(2022, 0, 18)}
						lastMessageSender='me'
						lastMessageValue='Здравствуйте! Я бы хотел работать в вашей компании' />
				</div>
			</div>
			<div className={className}>
				{children}
			</div>
		</MainLayout>
	);
};

export default MessengerLayout;
