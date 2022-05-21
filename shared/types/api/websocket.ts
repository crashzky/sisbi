import { IMessage } from './messenger';

interface IWebScoketMessage {
	identifier: string;
	message: IMessage;
}

export type {
	IWebScoketMessage,
};
