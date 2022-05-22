import Props from './InputMessenger.props';
import { useMutation } from 'react-query';
import { sendMessage, sendMessageEmployer } from '../../shared/api/messenger';
import useUserType from '../../hooks/useUserType';
import { useFormik } from 'formik';
import * as Yup from 'yup';

//import MicSolidIcon from '../../assets/media/Mic_solid.svg';
import Preloader from '../../assets/loader.svg';
import SendSolidIcon from '../../assets/communication/send_solid.svg';

const InputMessenger: React.FC<Props> = ({ className = '', ref, chatId, ...props }) => {
	const { userType } = useUserType();

	const { mutate, isLoading } = useMutation(userType === 'user' ? sendMessage : sendMessageEmployer, {
		onSuccess: () => formik.resetForm(),
	});

	const validationSchema = Yup.object().shape({
		message: Yup.string().required('requured'),
	});

	const formik = useFormik({
		initialValues: {
			message: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			mutate({
				message: {
					chat_id: chatId,
					type_message: 1,
					content: values.message,
				},
			});
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
				{isLoading ? (
					<Preloader className='w-[52px] h-[52px] stroke-lightBlue' />
				) : (
					<button type='button' className='bg-lightBlue h-full w-full rounded-full'>
						<SendSolidIcon className='fill-white mx-auto scale-75' />
					</button>
				)}
			</form>
		</div>
	);
};

export default InputMessenger;
