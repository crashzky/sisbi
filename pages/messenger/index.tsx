import Paragraph from '../../components/Paragraph';
import MessengerLayout from '../../layouts/MessengerLayout';
import withCheckAuthLayout from '../../layouts/CheckAuthLayout';

import NoSelectedChatIcon from '../../assets/no_selected_chat.svg';

const MessengerPage = (): JSX.Element => {
	return (
		<MessengerLayout className='h-full w-full flex justify-center items-center'>
			<div>
				<NoSelectedChatIcon />
				<Paragraph variant='4' tag='p' className='text-text-secondary mt-8 text-center'>
					Выберите чат, чтобы начать
				</Paragraph>
			</div>
		</MessengerLayout>
	);
};

export default withCheckAuthLayout(MessengerPage, {
	checkLoggined: true,
});
