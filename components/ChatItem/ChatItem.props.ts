import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, IChatParams {

};

interface IChatParams {
	chatId: number;
	companionAvatar: string | null;
	companionName: string;
	vacancyName: string;
	lastMessageValue: string;
	lastMessageSender: 'me' | 'companion';
	lastMessageReadedDate: Date | null;
	isActive?: boolean;
}

export default Props;

export type {
	IChatParams,
};
