import Paragraph from '../../components/Paragraph';
import Props from './SignupModal.props';
import { useFormik } from 'formik';
import InputPhone from '../../components/InputPhone';
import Button from '../../components/Button';
import { useRouter } from 'next/router';
import Radio from '../../components/Radio';
import Link from 'next/link';
import { useMutation } from 'react-query';
import { getSmsCode, signup } from '../../shared/api/auth';

import CrossIcon from '../../assets/general/close.svg';
import LoaderIcon from '../../assets/loader.svg';
import { isValidPhoneNumber } from 'react-phone-number-input';

const SignupModal: React.FC<Props> = ({ className = '', onSubmit, ...props }) => {
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			phone: '',
		},
		validate: (values) => {
			let errors: any = {};

			if(values.phone.length !== 13 || !isValidPhoneNumber('+7' + values.phone))
				errors.phone = 'length';

			return errors;
		},
		onSubmit: (values) => {
			signupMutation.mutate({
				phone: '+7' + values.phone,
			});
		},
	});

	const smsCodeMutation = useMutation(getSmsCode, {
		onSuccess: () => {
			sessionStorage.setItem('signup_phone', '+7' + formik.values.phone);
			router.push(router.pathname + '/?modal=code');
		},
	});

	const signupMutation = useMutation(signup, {
		onSuccess: () => {
			smsCodeMutation.mutate({
				phone: '+7' + formik.values.phone,
			});
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
				isDanger={!!formik.errors.phone && !!formik.submitCount}
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
			{signupMutation.isLoading || smsCodeMutation.isLoading ? (
				<LoaderIcon className='h-14 w-14 mx-auto mb-3' />
			) : (
				<Button className='w-full h-14 mb-3'>
					Зарегистрироваться
				</Button>
			)}
			{signupMutation.isError && (
				<Paragraph variant='5' tag='p' className='text-center text-red'>
					Аккаунт с таким телефоном уже зарегистрирован
				</Paragraph>
			)}
			<Button
				variant='outline'
				className='w-full h-14 mt-3 mb-4'
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
