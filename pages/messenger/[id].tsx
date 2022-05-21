import Paragraph from '../../components/Paragraph';
import MessengerLayout from '../../layouts/MessengerLayout';
import InputMessenger from '../../components/InputMessenger';
import Button from '../../components/Button';
import Message from '../../components/Message';
import { useEffect, useRef, useState } from 'react';
import useRefDemantions from '../../hooks/useRefDemantions';
import useWindowDemantions from '../../hooks/useWindowDementions';
import useWebSocket from 'react-use-websocket';
import ModalLayout from '../../layouts/ModalLayout';
import ContactsModal from '../../modals/ContactsModal';
import DeleteModal from '../../modals/DeleteModal';
import withCheckAuthLayout from '../../layouts/CheckAuthLayout';
import { MAIN_SHADOW } from '../../shared/consts/shadows';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { getChatById, getChatByIdEmployer, getMessages, getMessagesEmployer } from '../../shared/api/messenger';
import Image from 'next/image';
import useUserType from '../../hooks/useUserType';
import { IMessage } from '../../shared/types/api/messenger';
import WEBSOCKET_URL from '../../shared/consts/webscoket';

import CompanyLIcon from '../../assets/company-L.svg';
import OtherIcon from '../../assets/navigation/other.svg';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const ChatPage = (): JSX.Element => {
	const router = useRouter();

	const { userType } = useUserType();

	const buttonsRef = useRef();
	const inputRef = useRef();
	const endMessageRef = useRef(null);

	const windowSizes = useWindowDemantions();
	const buttonsSizes = useRefDemantions(buttonsRef);
	const inputSizes = useRefDemantions(inputRef);

	const [openedModal, setOpenedModal] = useState('');
	const [isOpenedMenu, setIsOpenedMenu] = useState(false);

	const [messages, setMessages] = useState<IMessage[]>([]);
	const [messagesPage, setMessagesPage] = useState(1);

	const chatInfoQuery = useQuery([{ chat_id: +router.query.id }], userType === 'user' ? getChatById : getChatByIdEmployer, {
		enabled: !!router.query && !!(router.query.id || +router.query.id === 0) && !!userType,
	});

	const messagesMutation = useMutation(userType === 'user' ? getMessages : getMessagesEmployer, {
		onSuccess: (res) => {
			setMessages((prev) => {
				let _res = [...res.payload];
				_res.reverse();

				return prev.concat(_res);
			});

			setTimeout(() => {
				endMessageRef.current.scrollIntoView();
			}, 1);
		},
	});

	const { lastMessage, sendMessage } = useWebSocket(`${WEBSOCKET_URL}?token=${localStorage.getItem('access_token')}`);

	useEffect(() => {
		setMessages([]);
		setMessagesPage(1);

		if(router.query && userType) {
			messagesMutation.mutate({
				chat_id: +router.query.id,
				page: messagesPage,
			});
		}

		sendMessage(`{"command":"subscribe","identifier":"{\\"channel\\":\\"ChatChannel\\",\\"chat_id\\":${router.query.id}}"}`);
	}, [router, userType]);

	useEffect(() => {
		if(lastMessage) {
			const MESSAGE = JSON.parse(lastMessage.data);
			
			if(MESSAGE.identifier && MESSAGE.message) {
				setMessages((prev) => prev.concat(MESSAGE.message));
				
				setTimeout(() => {
					endMessageRef.current.scrollIntoView();
				}, 1);
			}
		}
	}, [lastMessage]);

	function getProperties() {
		if(chatInfoQuery.isSuccess && userType === 'user') {
			return {
				title: chatInfoQuery.data.payload.vacancy.title,
				name: chatInfoQuery.data.payload.employer.name,
				avatar: chatInfoQuery.data.payload.employer.avatar,
				contact: {
					fullName: chatInfoQuery.data.payload.vacancy.full_name,
					phone: chatInfoQuery.data.payload.vacancy.phone,
					email: chatInfoQuery.data.payload.vacancy.email,
				},
			};
		}
		else if(chatInfoQuery.isSuccess && userType === 'employer') {
			return {
				title: chatInfoQuery.data.payload.vacancy.title,
				name: `${chatInfoQuery.data.payload.user.first_name} ${chatInfoQuery.data.payload.user.surname}`,
				avatar: chatInfoQuery.data.payload.user.avatar,
				contact: {
					fullName: `${chatInfoQuery.data.payload.user.surname} ${chatInfoQuery.data.payload.user.first_name}
					${chatInfoQuery.data.payload.user.last_name}`,
					phone: '+' + chatInfoQuery.data.payload.user.phone.toString(),
					email: chatInfoQuery.data.payload.user.email,
				},
			};
		}
	}

	return (
		<ModalLayout
			openedModal={openedModal}
			modals={{
				'contacts': (
					<ContactsModal
						fullName={chatInfoQuery.isSuccess && getProperties() ? getProperties().contact.fullName : 'Загрузка...'}
						phone={chatInfoQuery.isSuccess && getProperties() ? getProperties().contact.phone : 'Загрузка...'}
						mail={chatInfoQuery.isSuccess && getProperties() ? getProperties().contact.email : 'Загрузка...'}
						onClose={() => setOpenedModal('')} />
				),
				'delete': (
					<DeleteModal
						message='Работодатель больше не сможет вам писать, все материалы будут удалены '
						onCancel={() => setOpenedModal('')}
						onConfirm={() => setOpenedModal('')} />
				),
			}}
		>
			<MessengerLayout
				className='h-full w-full grid grid-rows-[68px_1fr_auto_56px] gap-3 pb-6 border-gray-60 border-r-[1px]'
			>
				<div className={`w-full px-4 py-3 grid grid-cols-[40px_auto_1fr_20px] 
					gap-4 items-center bg-white border-gray-60 border-b-[1px]`}
				>
					{chatInfoQuery.isSuccess && getProperties() && getProperties().avatar ? (
						<Image
							src={getProperties().avatar}
							alt='avatar'
							className='rounded-full object-cover'
							height={40}
							width={40} />
					) : (
						<CompanyLIcon />
					)}
					<div>
						<Paragraph variant='3' tag='h2' className='font-bold'>
							{chatInfoQuery.isSuccess && getProperties() ? getProperties().title : 'Загрузка...'}
						</Paragraph>
						<Paragraph variant='5' tag='p' className='text-text'>
							{chatInfoQuery.isSuccess && getProperties() ? getProperties().name : 'Загрузка...'}
						</Paragraph>
					</div>
					<div></div>
					<div className='relative'>
						<button
							onFocus={() => setIsOpenedMenu(true)}
							onBlur={() => setTimeout(() => setIsOpenedMenu(false), 100)}
						>
							<OtherIcon className='fill-icon-secondary' />
						</button>
						{isOpenedMenu && (
							<div
								className='absolute z-20 top-10 right-0 w-[186px] grid bg-white rounded-b-2xl'
								style={{
									boxShadow: MAIN_SHADOW,
								}}
							>
								<button
									className={`p-4 w-full flex justify-between items-center text-left
										text-sm border-b-[1px] border-button-secondary`}
									onClick={() => {
										if(userType === 'user')
											router.push(`/vacancies/${chatInfoQuery.data.payload.vacancy.id}`);
										else
											router.push(`/resumes/${chatInfoQuery.data.payload.user.id}`);
									}}
								>
									{userType === 'user' ? 'Открыть вакансию' : 'Открыть резюме'}
								</button>
								<button
									className={`p-4 w-full flex justify-between items-center text-left
										text-sm border-b-[1px] border-button-secondary`}
									onClick={() => setOpenedModal('contacts')}
								>
									Показать контакты
								</button>
								<button
									className={`p-4 w-full flex justify-between items-center text-red text-left
										text-sm`}
									onClick={() => setOpenedModal('delete')}
								>
									Удалить чат
								</button>
							</div>
						)}
					</div>
				</div>
				<div
					className='pl-[110px] pr-[95px] overflow-y-scroll h-fit w-full grid gap-1'
					style={{
						maxHeight: `${windowSizes.height - buttonsSizes.height - inputSizes.height - 215}px`,
					}}
				>
					{messages.map((i, num) => {
						const showDate = num <= 1 ||
							new Date(messages[num - 1].created_at).getMinutes() - 
							new Date(i.created_at).getMinutes() < 3;

						if(num === 0 || new Date(messages[num - 1].created_at).getDate() !== new Date(i.created_at).getDate()) {
							return (
								<>
									<Paragraph
										key={num + '_date'}
										variant='6'
										tag='p'
										className='text-text-secondary text-center my-4'
									>
										{format(new Date(i.created_at), 'dd MMMM yyyy', {
											locale: ru,
										})}
									</Paragraph>
									<Message
										key={num + '_message'}
										label={i.type_message === 'response' ? 'Отклик на вакансию' : null}
										message={i.content as string}
										sendedDate={new Date(i.created_at)}
										sender={i.sender_type.toLowerCase() === userType ? 'me' : 'companion'}
										showDate={showDate}
										className={showDate && 'pb-3'}
										readed={true} />
								</>
							);
						}
						else {
							return (
								<Message
									key={num + '_message'}
									label={i.type_message === 'response' ? 'Отклик на вакансию' : null}
									message={i.content as string}
									sendedDate={new Date(i.created_at)}
									sender={i.sender_type.toLowerCase() === userType ? 'me' : 'companion'}
									showDate={showDate}
									className={showDate && 'pb-3'}
									readed={true} />
							);
						}
					})}
					<div ref={endMessageRef}></div>
				</div>
				{userType === 'employer' ? (
					<div className='pl-[110px] pr-[95px] grid gap-2' ref={buttonsRef}>
						<Button variant='secondary' className='py-2 w-full font-normal'>
							Одобрить
						</Button>
						<Button variant='danger' className='py-2 w-full font-normal'>
							Отказать
						</Button>
					</div>
				) : (
					<div></div>
				)}
				<div ref={inputRef}>
					<InputMessenger chatId={+router.query.id} className='pl-[110px] pr-[95px]' />
				</div>
			</MessengerLayout>
		</ModalLayout>
	);
};

export default withCheckAuthLayout(ChatPage, {
	checkLoggined: true,
});
