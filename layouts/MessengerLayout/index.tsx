import { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { useMutation } from 'react-query';
import ChatItem from '../../components/ChatItem';
import CustomSelect from '../../components/CustomSelect';
import InputSearch from '../../components/InputSearch';
import Paragraph from '../../components/Paragraph';
import useUserType from '../../hooks/useUserType';
import { getChats, getChatsEmployer } from '../../shared/api/messenger';
import { UserType } from '../../shared/types/api/common';
import { IChat } from '../../shared/types/api/messenger';
import MainLayout from '../MainLayout';
import Props from './MessengerLayout.props';

const MessengerLayout: React.FC<Props> = ({ className, children }) => {
	const [selectedMenuItem, setSelectedMenuItem] = useState({ label: 'Все отклики', value: 'Все отклики' });

	const { userType } = useUserType();

	const [page, setPage] = useState(0);
	const [chats, setChats] = useState<IChat[]>([]);

	const { isLoading, mutate } = useMutation(userType === 'user' ? getChats : getChatsEmployer, {
		onSuccess: (res) => {
			setChats((prev) => {
				return prev.concat(
					res.payload.filter((j) => {
						return !prev.find((u) => u.id === j.id);
					})
				);
			});
		},
	});

	useEffect(() => {
		document.body.style.overflowY = 'hidden';

		mutate({
			page: 1,
		});
	}, []);

	function getMessageSender(messageSender: UserType) {
		if(userType === 'user' && messageSender === 'User')
			return 'me';
		else if(userType === 'user' && messageSender === 'Employer')
			return 'companion';
		else if(userType === 'employer' && messageSender === 'User')
			return 'companion';
		else if(userType === 'employer' && messageSender === 'Employer')
			return 'me';
	}

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
					{isLoading && !chats.length ? (
						<ContentLoader
							height={1200}
							width={1060}
							backgroundColor='#f5f5f5'
							foregroundColor='#dbdbdb'
							className='mt-3 ml-3'
						>
							<rect x='103' y='12' rx='3' ry='3' width='123' height='7' />
							<rect x='102' y='152' rx='3' ry='3' width='171' height='6' />
							<circle cx='44' cy='42' r='38' />
							<circle cx='44' cy='147' r='38' />
							<circle cx='44' cy='251' r='38' />
							<rect x='105' y='117' rx='3' ry='3' width='123' height='7' />
							<rect x='104' y='222' rx='3' ry='3' width='123' height='7' />
							<rect x='105' y='48' rx='3' ry='3' width='171' height='6' />
							<rect x='104' y='257' rx='3' ry='3' width='171' height='6' />
						</ContentLoader>
					) : chats.map((i, num) => (
						<ChatItem
							key={num}
							chatId={i.id}
							companionAvatar={userType === 'user' ? i.employer.avatar : i.user.avatar}
							companionName={userType === 'user' ? i.employer.name : `${i.user.first_name} ${i.user.surname}`}
							vacancyName={i.vacancy.title}
							lastMessageReadedDate={new Date(i.last_message.created_at)}
							lastMessageSender={getMessageSender(i.last_message.sender_type)}
							lastMessageValue={i.last_message.content.toString()} />
					))}
				</div>
			</div>
			<div className={className}>
				{children}
			</div>
		</MainLayout>
	);
};

export default MessengerLayout;
