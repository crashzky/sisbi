import Props from './InputMessenger.props';
import { useMutation } from 'react-query';
import { sendMessage, sendMessageEmployer } from '../../shared/api/messenger';
import useUserType from '../../hooks/useUserType';

//import MicSolidIcon from '../../assets/media/Mic_solid.svg';
import SendSolidIcon from '../../assets/communication/send_solid.svg';
import { useFormik } from 'formik';

const InputMessenger: React.FC<Props> = ({ className = '', ref, chatId, ...props }) => {
	const { userType } = useUserType();

	const { mutate } = useMutation(userType === 'user' ? sendMessage : sendMessageEmployer);

	const formik = useFormik({
		initialValues: {
			message: '',
		},
		onSubmit: (values) => {
			mutate({
				message: {
					chat_id: chatId,
					type_message: 1,
					content: values.message,
				},
			});
			formik.resetForm();
		},
	});

	return (
		<div ref={ref} className={className}>
			<form onSubmit={formik.handleSubmit} className='grid grid-cols-[1fr_52px] h-[52px] gap-4'>
				<input
					name='message'
					value={formik.values.message}
					onChange={formik.handleChange}
					placeholder='Сообщение'
					className='p-4 rounded-xl text-sm h-full outline-none placeholder:text-text-secondary'
					style={{
						boxShadow: `0px 7px 4px rgba(35, 47, 59, 0.02), 0px 3px 3px rgba(35, 47, 59, 0.03),
							0px 1px 2px rgba(35, 47, 59, 0.03), 0px 0px 0px rgba(35, 47, 59, 0.03)`,
					}}
					{...props} />
				<button className='bg-lightBlue h-full w-full rounded-full'>
					<SendSolidIcon className='fill-white mx-auto scale-75' />
				</button>
			</form>
		</div>
	);
};

export default InputMessenger;
