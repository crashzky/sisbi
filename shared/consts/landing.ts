import { IFeatureItem } from '../types/landing';

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
		description: `Такого вы еще не видели. Ищите работу или сотрудников,
			свайпая карточки. Лучше один раз увидеть, чем 100 раз прочитать`,
	},
];

export {
	FEATURES_ITEMS,
};
