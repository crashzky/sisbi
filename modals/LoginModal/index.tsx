import Paragraph from '../../components/Paragraph';
import Props from './Login.props';
import { useFormik } from 'formik';
import InputPhone from '../../components/InputPhone';
import Button from '../../components/Button';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { getSmsCodeEmployer, getSmsCodeUser } from '../../shared/api/auth';
import { isValidPhoneNumber } from 'react-phone-number-input';
import Radio from '../../components/Radio';
import USER_TYPES from '../../shared/consts/userTypes';

import CrossIcon from '../../assets/general/close.svg';
import LoaderIcon from '../../assets/loader.svg';

const LoginModal: React.FC<Props> = ({ className = '', onSubmit, ...props }) => {
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			phone: '',
			radio: 'Ищу работу',
		},
		validate: (values) => {
			let errors: any = {};

			if(values.phone.length !== 13 || !isValidPhoneNumber('+7' + values.phone))
				errors.phone = 'length';

			return errors;
		},
		onSubmit: (values) => {
			switch(values.radio) {
				case 'Ищу работу':
					smsCodeMutationUser.mutate({
						phone: '+7' + values.phone,
					});
					break;
				case 'Ищу сотрудников':
					smsCodeMutationEmployer.mutate({
						phone: '+7' + values.phone,
					});
					break;
			}
		},
	});

	const smsCodeMutationUser = useMutation(getSmsCodeUser, {
		onSuccess: () => {
			sessionStorage.setItem('signup_phone', '+7' + formik.values.phone);
			localStorage.setItem('user_type', USER_TYPES[formik.values.radio]);

			router.push(router.pathname + '/?modal=code');
		},
	});

	const smsCodeMutationEmployer = useMutation(getSmsCodeEmployer, {
		onSuccess: () => {
			sessionStorage.setItem('signup_phone', '+7' + formik.values.phone);
			localStorage.setItem('user_type', USER_TYPES[formik.values.radio]);

			router.push(router.pathname + '/?modal=code');
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
				name='phone'
				isDanger={!!formik.errors.phone && !!formik.submitCount}
				value={formik.values.phone}
				onChange={formik.handleChange} />
			<Radio
				className='mt-6 mb-3 flex gap-4'
				name='radio'
				onChange={formik.handleChange}
				value={formik.values.radio}
				items={[
					'Ищу работу',
					'Ищу сотрудников',
				]} />
			{smsCodeMutationUser.isError || smsCodeMutationEmployer.isError && (
				<Paragraph variant='5' tag='p' className='text-center text-red'>
					Такого аккаунта не существует
				</Paragraph>
			)}
			{smsCodeMutationUser.isLoading || smsCodeMutationEmployer.isLoading ? (
				<LoaderIcon className='w-14 h-14 mx-auto mt-3 mb-6' />
			) : (
				<Button className='w-full h-14 mt-3 mb-6'>
					Войти
				</Button>
			)}
			<Button
				variant='outline'
				className='w-full h-14'
				onClick={() => {
					router.push({
						pathname: '/',
						query: {
							modal: 'signup',
						},
					});
				}}
			>
				Создать аккаунт
			</Button>
		</form>
	);
};

export default LoginModal;
