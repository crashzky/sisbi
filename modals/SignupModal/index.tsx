import Paragraph from '../../components/Paragraph';
import Props from './SignupModal.props';
import { useFormik } from 'formik';
import InputPhone from '../../components/InputPhone';
import Button from '../../components/Button';
import { useRouter } from 'next/router';
import Radio from '../../components/Radio';
import Link from 'next/link';
import { useMutation } from 'react-query';
import { getSmsCodeEmployer, getSmsCodeUser, signupEmployer, signupUser } from '../../shared/api/auth';
import { isValidPhoneNumber } from 'react-phone-number-input';
import USER_TYPES from '../../shared/consts/userTypes';
import { AxiosError } from 'axios';

import CrossIcon from '../../assets/general/close.svg';
import LoaderIcon from '../../assets/loader.svg';

const SignupModal: React.FC<Props> = ({ className = '', onSubmit, ...props }) => {
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			phone: '',
			radio: 'Ищу работу',
		},
		validate: (values) => {
			let errors: any = {};

			if(values.phone.length !== 13 || !isValidPhoneNumber('+7' + values.phone.replaceAll(' ', '')))
				errors.phone = 'length';

			return errors;
		},
		onSubmit: (values) => {
			switch(values.radio) {
				case 'Ищу работу':
					signupMutationUser.mutate({
						user: {
							phone: '+7' + values.phone.replaceAll(' ', ''),
						},
					});
					break;
				case 'Ищу сотрудников':
					signupMutationEmployer.mutate({
						employer: {
							phone: '+7' + values.phone.replaceAll(' ', ''),
						},
					});
					break;
			}
		},
	});

	const signupMutationUser = useMutation(signupUser, {
		onSuccess: () => {
			smsCodeMutationUser.mutate({
				phone: '+7' + formik.values.phone.replaceAll(' ', ''),
			});
		},
	});

	const smsCodeMutationUser = useMutation(getSmsCodeUser, {
		onSuccess: () => {
			sessionStorage.setItem('signup_phone', '+7' + formik.values.phone.replaceAll(' ', ''));
			localStorage.setItem('user_type', USER_TYPES[formik.values.radio]);

			router.push(router.pathname + '/?modal=code');
		},
	});

	const signupMutationEmployer = useMutation(signupEmployer, {
		onSuccess: () => {
			smsCodeMutationEmployer.mutate({
				phone: '+7' + formik.values.phone.replaceAll(' ', ''),
			});
		},
	});

	const smsCodeMutationEmployer = useMutation(getSmsCodeEmployer, {
		onSuccess: () => {
			sessionStorage.setItem('signup_phone', '+7' + formik.values.phone.replaceAll(' ', ''));
			localStorage.setItem('user_type', USER_TYPES[formik.values.radio]);

			router.push(router.pathname + '/?modal=code');
		},
	});

	function getErrorMessage() {
		if(signupMutationUser.isError) {
			switch((signupMutationUser.error as AxiosError).response.status) {
				case 422:
					return 'Такой пользователь уже существует';
				default:
					return 'Что-то пошло не так, попробуйте ещё раз позже';
			}
		}
		else if(signupMutationEmployer.isError) {
			switch((signupMutationEmployer.error as AxiosError).response.status) {
				case 422:
					return 'Такой пользователь уже существует';
				default:
					return 'Что-то пошло не так, попробуйте ещё раз позже';
			}
		}
		else if(smsCodeMutationUser.isError || smsCodeMutationEmployer.isError)
			return 'Что-то пошло не так, попробуйте ещё раз позже';
	}

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
				className='mb-6 grid grid-flow-col w-fit gap-4'
				name='radio'
				onChange={formik.handleChange}
				value={formik.values.radio}
				items={[
					'Ищу работу',
					'Ищу сотрудников',
				]} />
			{signupMutationUser.isLoading || signupMutationEmployer.isLoading
			|| smsCodeMutationUser.isLoading || smsCodeMutationEmployer.isLoading
				? (
					<LoaderIcon className='h-14 w-14 mx-auto mb-3' />
				) : (
					<Button className='w-full h-14 mb-3'>
						Зарегистрироваться
					</Button>
				)}
			{(signupMutationUser.isError || signupMutationEmployer.isError) && (
				<Paragraph variant='5' tag='p' className='text-center text-red'>
					{getErrorMessage()}
				</Paragraph>
			)}
			<Button
				variant='outline'
				className='w-full h-14 mt-3 mb-4'
				type='button'
				onClick={() => {
					switch(formik.values.radio) {
						case 'Ищу работу':
							smsCodeMutationUser.mutate({
								phone: '+7' + formik.values.phone.replaceAll(' ', ''),
							});
							break;
						case 'Ищу сотрудников':
							smsCodeMutationEmployer.mutate({
								phone: '+7' + formik.values.phone.replaceAll(' ', ''),
							});
							break;
					}
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
