import { IFeatureItem, IHelpItem } from '../types/landing';

import ChatSolidIcon from '../../assets/communication/chat_solid.svg';
import SpeakerSolidIcon from '../../assets/communication/speaker_solid.svg';
import MobileSolidIcon from '../../assets/system_devices/mobile_solid.svg';

const FEATURES_ITEMS: IFeatureItem[] = [
	{
		Icon: ChatSolidIcon,
		label: 'Свой полноценный месседжер',
		description: `Отправляйте фото, видео или общайтесь с помощью голосовых
			сообщений. Мы сделали все, чтобы общаться было легко!`,
	},
	{
		Icon: SpeakerSolidIcon,
		label: 'Нет необходимости в собеседованиях',
		description: `Отправляйте работодателям короткую видео-презентацию о себе
			через наш мессенджер. Это избавит от необходимости поводить собеседование`,
	},
	{
		Icon: MobileSolidIcon,
		label: 'Уникальное мобильное приложение',
		description: `Такого вы еще не видели. Ищите работу или сотрудников, свайпая карточки.
			Лучше один раз увидеть, чем 100 раз прочитать.`,
	},
];

const HELP_ITEMS: IHelpItem[] = [
	{
		label: 'В чем уникальность вашего мессенджера?',
		description: `В отличии от других сервисов мы предоставляем полноценный мессенджер,
			в котором доступны отправка фото, видео и аудио сообщений. Это позволяет работодателям
			запрашивать у соискателей видео-презентацию о себе и избавляет от необходимости проводить первичные
			собеседования для того, чтобы познакомиться с кандидатом получше.`,
	},
	{
		label: 'Гарантируете ли вы конфиденциальность моих данных?',
		description: `Если вы соискатель, то никто не сможет узнать ваши контакты, без вашего разрешения.
			Контакты предоставляете вы сами в ходе переписки с работодателями. Если вы работодатель,
			то вы также сами вправе выбирать публиковать ли свои контакты или нет.`,
	},
	{
		label: 'Нужно ли мне платить за использование вашего сервиса?',
		description: `Для соискателей сервис абсолютно бесплатен. Для работодателей размещение так-же  бесплатное,
			работодатель может оплатить вакансию только когда получит достаточно откликов.`,
	},
	{
		label: 'В чем особенность вашего мобильного приложения?',
		description: `Простой и интересный поиск работы. Достаточно свайпнуть вправо для отклика на
			понравившуюся вакансию или свайпнуть влево для просмотра остальных вакансий.`,
	},
	{
		label: 'Проходят ли модерацию вакансии, публикуемые на вашем сервисе?',
		description: `Все публикуемые вакансии и резюме проходят модерацию в ручную, течении 15 минут.
			Поэтому вы можете не переживать - мы не пропустим мошеннические публикации на наш сервис.`,
	},
];

export {
	FEATURES_ITEMS,
	HELP_ITEMS,
};
