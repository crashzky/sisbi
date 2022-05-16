import { SenderType } from './Message.props';

function getMessageStyles(sender: SenderType): string {
	switch(sender) {
		case 'me':
			return 'bg-darkBlue text-white rounded-br-none';
		case 'companion':
			return 'bg-gray-40 rounded-bl-none';
	}
}

export default getMessageStyles;
