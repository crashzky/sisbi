import { useState } from 'react';
import ChatItem from '../../components/ChatItem';
import InputSearch from '../../components/InputSearch';
import Paragraph from '../../components/Paragraph';
import Select from '../../components/Select';
import MainLayout from '../MainLayout';
import Props from './MessengerLayout.props';

import NoSelectedChatIcon from '../../assets/no_selected_chat.svg';

const MessengerLayout: React.FC<Props> = () => {
	const [selectedMenuItem, setSelectedMenuItem] = useState({ label: 'Все отклики', value: 'Все отклики' });

	return (
		<MainLayout
			className='px-40 h-[calc(100vh_-_96px)] bg-[#FAFBFC] grid grid-cols-[363px_1fr]'
			withFooter={false}
			headerClassname='border-b-[1px] border-[#ECEDF0]'
		>
			<div className='bg-white border-x-[1px] border-[#ECEDF0]'>
				<div className='p-4 border-b-[1px] border-[#ECEDF0]'>
					<InputSearch
						placeholder='Название вакансии, компании' />
					<div className='flex justify-between items-center mt-4'>
						<Paragraph variant='6' tag='p' className='text-text-secondary'>
							Показывать:
						</Paragraph>
						<Select
							variant='transparent'
							isSearchable={false}
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
						companionAvatar=''
						companionName='Рич Фэмили'
						vacancyName='UI/UX дизайнер'
						lastMessageReadedDate={new Date(2022, 0, 18)}
						lastMessageSender='me'
						lastMessageValue='Здравствуйте! Я бы хотел работать в вашей компании' />
					<ChatItem
						companionAvatar=''
						companionName='Рич Фэмили'
						vacancyName='UI/UX дизайнер'
						lastMessageReadedDate={new Date(2022, 0, 18)}
						lastMessageSender='me'
						lastMessageValue='Здравствуйте! Я бы хотел работать в вашей компании' />
					<ChatItem
						companionAvatar=''
						companionName='Рич Фэмили'
						vacancyName='UI/UX дизайнер'
						lastMessageReadedDate={new Date(2022, 0, 18)}
						lastMessageSender='me'
						lastMessageValue='Здравствуйте! Я бы хотел работать в вашей компании' />
					<ChatItem
						companionAvatar=''
						companionName='Рич Фэмили'
						vacancyName='UI/UX дизайнер'
						lastMessageReadedDate={new Date(2022, 0, 18)}
						lastMessageSender='me'
						lastMessageValue='Здравствуйте! Я бы хотел работать в вашей компании' />
					<ChatItem
						companionAvatar=''
						companionName='Рич Фэмили'
						vacancyName='UI/UX дизайнер'
						lastMessageReadedDate={new Date(2022, 0, 18)}
						lastMessageSender='me'
						lastMessageValue='Здравствуйте! Я бы хотел работать в вашей компании' />
					<ChatItem
						companionAvatar=''
						companionName='Рич Фэмили'
						vacancyName='UI/UX дизайнер'
						lastMessageReadedDate={new Date(2022, 0, 18)}
						lastMessageSender='me'
						lastMessageValue='Здравствуйте! Я бы хотел работать в вашей компании' />
					<ChatItem
						companionAvatar=''
						companionName='Рич Фэмили'
						vacancyName='UI/UX дизайнер'
						lastMessageReadedDate={new Date(2022, 0, 18)}
						lastMessageSender='me'
						lastMessageValue='Здравствуйте! Я бы хотел работать в вашей компании' />
					<ChatItem
						companionAvatar=''
						companionName='Рич Фэмили'
						vacancyName='UI/UX дизайнер'
						lastMessageReadedDate={new Date(2022, 0, 18)}
						lastMessageSender='me'
						lastMessageValue='Здравствуйте! Я бы хотел работать в вашей компании' />
				</div>
			</div>
			<div className='h-full w-full flex justify-center items-center'>
				<div>
					<NoSelectedChatIcon />
					<Paragraph variant='4' tag='p' className='text-text-secondary mt-8 text-center'>
						Выберите чат, чтобы начать
					</Paragraph>
				</div>
			</div>
		</MainLayout>
	);
};

export default MessengerLayout;
