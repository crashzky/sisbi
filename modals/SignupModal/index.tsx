import Paragraph from '../../components/Paragraph';
import Props from './SignupModal.props';
import { useFormik } from 'formik';
import InputPhone from '../../components/InputPhone';
import Button from '../../components/Button';
import { useRouter } from 'next/router';
import Radio from '../../components/Radio';
import Link from 'next/link';

import CrossIcon from '../../assets/general/close.svg';

const SignupModal: React.FC<Props> = ({ className = '', onSubmit, ...props }) => {
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
					Регистрация
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
			<Radio
				className='mb-6 flex gap-4'
				name='radio'
				items={[
					'Ищу работу',
					'Ищу сотрудников',
				]} />
			<Button className='w-full h-14 mb-6'>
				Зарегистрироваться
			</Button>
			<Button
				variant='outline'
				className='w-full h-14 mb-4'
				onClick={() => {
					router.push({
						pathname: '/',
						query: {
							modal: 'login',
						},
					});
				}}
			>
				Войти
			</Button>
			<Paragraph variant='6' tag='p' className='text-center'>
				Нажимая на кнопку, вы соглашаетесь с
				{' '}
				<Link href='#'>
					<a className='text-darkBlue text-xs'>
						нашей политикой
					</a>
				</Link>
			</Paragraph>
		</form>
	);
};

export default SignupModal;
