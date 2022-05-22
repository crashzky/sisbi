import { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { useMutation } from 'react-query';
import ChatItem from '../../components/ChatItem';
import CustomSelect from '../../components/CustomSelect';
import InputSearch from '../../components/InputSearch';
import Paragraph from '../../components/Paragraph';
import useUserType from '../../hooks/useUserType';
import { getChats, getChatsEmployer } from '../../shared/api/messenger';
import { getMyVacancies } from '../../shared/api/vacancies';
import { UserType } from '../../shared/types/api/common';
import { IChat } from '../../shared/types/api/messenger';
import { IVacancy } from '../../shared/types/api/vacancies';
import MainLayout from '../MainLayout';
import Props from './MessengerLayout.props';

const MessengerLayout: React.FC<Props> = ({ className, children }) => {
	const [selectedMenuItem, setSelectedMenuItem] = useState({ label: 'Все отклики', value: 'Все отклики' });

	const { userType } = useUserType();

	const [page, setPage] = useState(1);
	const [chats, setChats] = useState<IChat[]>([]);

	const [vacancies, setVacancies] = useState<IVacancy[]>([]);
	
	const [searchQuery, setSearchQuery] = useState('');

	const { isLoading, mutate, data } = useMutation(userType === 'user' ? getChats : getChatsEmployer, {
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

	const vacanciesMutation = useMutation(getMyVacancies, {
		onSuccess: (res) => {
			setVacancies((prev) => prev.concat(res.payload));

			if(res.total_pages !== res.current_page) {
				vacanciesMutation.mutate({
					queryKey: [{
						page: res.current_page + 1,
					}],
				});
			}
		},
	});

	useEffect(() => {
		document.body.style.overflowY = 'hidden';

		if(userType) {
			mutate({
				page: page,
			});
		}

		if(userType === 'employer') {
			vacanciesMutation.mutate({
				queryKey: [{
					page: 1,
				}],
			});
		}
	}, [userType]);

	useEffect(() => {
		if(userType) {
			mutate({
				page: page,
			});
		}
	}, [page]);

	useEffect(() => {
		setVacancies([]);
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
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder='Название вакансии, компании' />
					<div className='flex justify-between items-center mt-4'>
						<Paragraph variant='6' tag='p' className='text-text-secondary'>
							Показывать:
						</Paragraph>
						<CustomSelect
							value={selectedMenuItem}
							onChange={setSelectedMenuItem}
							options={userType === 'user' ? [
								{ label: 'Все отклики', value: 'Все отклики' },
								{ label: 'Приглашения', value: 'Приглашения' },
								{ label: 'В ожидании', value: 'В ожидании' },
								{ label: 'Отказ', value: 'Отказ' },
							] : [
								{ label: 'Все отклики', value: 'Все отклики' },
								...vacancies.map((i) => ({ label: i.title, value: i.id.toString() })),
							]}
							subLabels={userType === 'employer'&& vacancies.map((i) => ({
								label: `У вас ${i.count_responses} откликов на этой вакансии`,
								value: i.id.toString(),
							}))} />
					</div>
				</div>
				<div
					className='grid items-start h-fit max-h-[calc(100vh_-_250px)] overflow-y-scroll'
					onScroll={(e) => {
						const isScrolledBottom = (e.target as any).scrollHeight
							- (e.target as any).scrollTop === (e.target as any).clientHeight;

						if(isScrolledBottom && data && data.total_pages >= page + 1)
							setPage((prev) => prev + 1);
					}}
				>
					{chats
						.filter((i) => 
							i.vacancy.title.toLowerCase()
								.includes(searchQuery.toLowerCase())
							|| `${i.user.first_name} ${i.user.surname} ${i.user.last_name}`.toLowerCase()
								.includes(searchQuery.toLowerCase())
							|| i.employer.name.toLowerCase()
								.includes(searchQuery.toLowerCase())
							|| i.last_message.content.toString().toLowerCase()
								.includes(searchQuery.toLowerCase()))
						.filter((i) =>
							selectedMenuItem.value === 'Все отклики'
							|| (userType === 'employer' && i.vacancy.id === +selectedMenuItem.value)
							|| (userType === 'user' && selectedMenuItem.value === 'Приглашения' && i.last_invite)
							|| (userType === 'user' && selectedMenuItem.value === 'В ожидании' && (
								(i.last_invite && i.last_invite.state) === 'created' || i.last_response.state === 'accepted'
							))
							|| (userType === 'user' && selectedMenuItem.value === 'Отказ' && (
								(i.last_invite && i.last_invite.state === 'declined') || i.last_response.state === 'declined'
							)))
						.map((i, num) => (
							<ChatItem
								key={num}
								chatId={i.id}
								companionAvatar={userType === 'user' ? i.employer.avatar : i.user.avatar}
								companionName={userType === 'user' ? i.employer.name : `${i.user.first_name} ${i.user.surname}`}
								vacancyName={i.vacancy.title}
								lastMessageReadedDate={i.last_message.seen_at && new Date(i.last_message.seen_at)}
								lastMessageSender={getMessageSender(i.last_message.sender_type)}
								lastMessageValue={i.last_message.content as string} />
						))}
					{isLoading && (
						<ContentLoader
							height={300}
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
					)}
				</div>
			</div>
			<div className={className}>
				{children}
			</div>
		</MainLayout>
	);
};

export default MessengerLayout;
