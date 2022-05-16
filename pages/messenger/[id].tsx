import Paragraph from '../../components/Paragraph';
import MessengerLayout from '../../layouts/MessengerLayout';
import InputMessenger from '../../components/InputMessenger';
import Button from '../../components/Button';
import Message from '../../components/Message';
import { useEffect, useRef, useState } from 'react';
import useRefDemantions from '../../hooks/useRefDemantions';
import useWindowDemantions from '../../hooks/useWindowDementions';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import ModalLayout from '../../layouts/ModalLayout';
import ContactsModal from '../../modals/ContactsModal';
import DeleteModal from '../../modals/DeleteModal';
import withCheckAuthLayout from '../../layouts/CheckAuthLayout';
import { MAIN_SHADOW } from '../../shared/consts/shadows';
import { useRouter } from 'next/router';

import CompanyLIcon from '../../assets/company-L.svg';
import OtherIcon from '../../assets/navigation/other.svg';

const ChatPage = (): JSX.Element => {
	const router = useRouter();

	const buttonsRef = useRef();
	const inputRef = useRef();
	const endMessageRef = useRef(null);

	const windowSizes = useWindowDemantions();
	const buttonsSizes = useRefDemantions(buttonsRef);
	const inputSizes = useRefDemantions(inputRef);

	const [openedModal, setOpenedModal] = useState('');
	const [isOpenedMenu, setIsOpenedMenu] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			endMessageRef.current.scrollIntoView();
		}, 1);
	}, []);

	return (
		<ModalLayout
			openedModal={openedModal}
			modals={{
				'contacts': (
					<ContactsModal
						fullName='Мария Соколова'
						phone='+79139822927'
						mail='mail@mail.ru'
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
					<CompanyLIcon />
					<div>
						<Paragraph variant='3' tag='h2' className='font-bold'>
							UI/UX дизайнер
						</Paragraph>
						<Paragraph variant='5' tag='p' className='text-text'>
							Рич Фэмили
						</Paragraph>
					</div>
					<div></div>
					<div className='relative'>
						<button
							onFocus={() => setIsOpenedMenu(true)}
							onBlur={() => setTimeout(() => setIsOpenedMenu(false), 20)}
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
									onClick={() => router.push('/vacancies/13')}
								>
									Открыть вакансию
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
					className='pl-[110px] pr-[95px] overflow-y-scroll h-fit w-full grid'
					style={{
						height: `${windowSizes.height - buttonsSizes.height - inputSizes.height - 215}px`,
					}}
				>
					<Message
						label='Отклик на вакансию'
						message={`Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов,
							но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э.,
							то есть более двух тысячелетий назад.`}
						sendedDate={new Date(2022, 1, 18, 18, 30)}
						sender='me'
						readed={true} />
					<Message
						label='Отклик на вакансию'
						message={`Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов,
							но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э.,
							то есть более двух тысячелетий назад.`}
						sendedDate={new Date(2022, 1, 18, 18, 30)}
						sender='companion'
						readed={true} />
					<Paragraph variant='6' tag='p' className='text-text-secondary text-center my-4'>
						{format(new Date(2022, 1, 10), 'dd MMMM yyyy', {
							locale: ru,
						})}
					</Paragraph>
					<Message
						label='Отклик на вакансию'
						message={`Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов,
							но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э.,
							то есть более двух тысячелетий назад.`}
						sendedDate={new Date(2022, 1, 18, 18, 30)}
						sender='me'
						readed={true} />
					<Message
						label='Отклик на вакансию'
						message={`Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов,
							но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э.,
							то есть более двух тысячелетий назад.`}
						sendedDate={new Date(2022, 1, 18, 18, 30)}
						sender='companion'
						readed={true} />
					<div ref={endMessageRef}></div>
				</div>
				<div className='pl-[110px] pr-[95px] grid gap-2' ref={buttonsRef}>
					<Button variant='secondary' className='py-2 w-full font-normal'>
						Отправить контакты
					</Button>
					<Button variant='danger' className='py-2 w-full font-normal'>
						Отказать
					</Button>
				</div>
				<div ref={inputRef}>
					<InputMessenger className='pl-[110px] pr-[95px]' />
				</div>
			</MessengerLayout>
		</ModalLayout>
	);
};

export default withCheckAuthLayout(ChatPage, {
	checkLoggined: true,
});
