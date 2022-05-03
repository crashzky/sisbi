import Paragraph from '../../components/Paragraph';
import Props from './Login.props';
import { useFormik } from 'formik';

import CrossIcon from '../../assets/general/close.svg';
import InputPhone from '../../components/InputPhone';
import Button from '../../components/Button';
import { useRouter } from 'next/router';

const LoginModal: React.FC<Props> = ({ className = '', onSubmit, ...props }) => {
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			phone: '',
		},
		onSubmit: (values) => {
			
		},
	});

	return (
		<form 
			className={className + ' bg-white rounded-2xl p-6 w-[362px]'}
			onSubmit={(e) => {
				formik.handleSubmit(e);
				if(onSubmit)
					onSubmit(e);
			}}
			{...props}
		>
			<div className='flex justify-between mb-6'>
				<Paragraph variant='1' tag='h2' className='font-semibold'>
					Вход
				</Paragraph>
				<button onClick={() => router.push('/')}>
					<CrossIcon className='fill-icon-secondary' /> 
				</button>
			</div>
			<InputPhone
				className='mb-6'
				name='phone'
				value={formik.values.phone}
				onChange={formik.handleChange} />
			<Button className='w-full h-14 mb-6'>
				Войти
			</Button>
			<Button variant='outline' className='w-full h-14'>
				Создать аккаунт
			</Button>
		</form>
	);
};

export default LoginModal;
