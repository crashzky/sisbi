import Paragraph from '../../components/Paragraph';
import Props from './SmsCodeModal.props';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import SmsCode from '../../components/SmsCode';
import { useTimer } from 'react-timer-hook';
import { useMutation } from 'react-query';
import { getSmsCodeEmployer, getSmsCodeUser, loginEmployer, loginUser } from '../../shared/api/auth';
import { useState } from 'react';
import { getMyProfileEmployer, getMyProfileUser } from '../../shared/api/user';

import CrossIcon from '../../assets/general/close.svg';
import LoaderIcon from '../../assets/loader.svg';

const SmsCodeModal: React.FC<Props> = ({ className = '', ...props }) => {
	const router = useRouter();

	const [smsCode, setSmsCode] = useState('');

	const { minutes, seconds, restart } = useTimer({ expiryTimestamp: new Date(Date.now() + 120000) });

	function addZero(input: string) {
		return input.length === 2 ? input : '0' + input;
	}

	const getProfileMutattionUser = useMutation(getMyProfileUser, {
		onSuccess: (data) => {
			if(!!data.payload.first_name)
				router.reload();
			else
				router.push(router.pathname + '/?modal=signup1');
		},
	});

	const getProfileMutattionEmployer = useMutation(getMyProfileEmployer, {
		onSuccess: (data) => {
			if(!!data.payload.name)
				router.reload();
			else
				router.push(router.pathname + '/?modal=signup1employer');
		},
	});

	const getNewCodeMutattionUser = useMutation(getSmsCodeUser, {
		onSuccess: () => {
			restart(new Date(Date.now() + 120000));
		},
	});

	const getNewCodeMutattionEmployer = useMutation(getSmsCodeEmployer, {
		onSuccess: () => {
			restart(new Date(Date.now() + 120000));
		},
	});

	const loginMutattionUser = useMutation(loginUser, {
		onSuccess: (data) => {
			localStorage.setItem('access_token', data.access_token);
			sessionStorage.removeItem('signup_phone');
			getProfileMutattionUser.mutate();
		},
	});

	const loginMutattionEmployer = useMutation(loginEmployer, {
		onSuccess: (data) => {
			localStorage.setItem('access_token', data.access_token);
			sessionStorage.removeItem('signup_phone');
			getProfileMutattionEmployer.mutate();
		},
	});

	return (
		<aside 
			className={className + ' bg-white rounded-2xl p-6 w-[362px]'}
			{...props}
		>
			<div className='flex justify-between mb-6'>
				<Paragraph variant='1' tag='h2' className='font-semibold'>
					Код подтверждения
				</Paragraph>
				<button onClick={() => router.push('/')}>
					<CrossIcon className='fill-icon-secondary' /> 
				</button>
			</div>
			<SmsCode
				isDanger={loginMutattionUser.isError || loginMutattionEmployer.isError}
				className='mb-3 justify-center'
				onCodeChanged={(code) => setSmsCode(code)} />
			{(loginMutattionUser.isError || loginMutattionEmployer.isError) && (
				<Paragraph variant='5' tag='p' className='text-center text-red'>
					Код не подходит
				</Paragraph>
			)}
			<button
				type='button'
				className='mt-3 mb-6 mx-auto block font-semibold text-xs text-darkBlue'
				onClick={() => {
					if(minutes === 0 && seconds === 0) {
						switch(localStorage.getItem('user_type')) {
							case 'user':
								getNewCodeMutattionUser.mutate({
									phone: sessionStorage.getItem('signup_phone'),
								});
								break;
							case 'employer':
								getNewCodeMutattionEmployer.mutate({
									phone: sessionStorage.getItem('signup_phone'),
								});
								break;
						}
					}
				}}
			>
				Выслать код повторно
				{(minutes !== 0 && seconds !== 0) && (
					` через ${addZero(minutes.toString())}:${addZero(seconds.toString())}`
				)}
			</button>
			{(loginMutattionUser.isLoading || loginMutattionEmployer.isLoading
			|| getProfileMutattionUser.isLoading || getProfileMutattionEmployer.isLoading)
				? (
					<LoaderIcon className='h-14 w-14 mx-auto' />
				) : (
					<Button
						className='w-full h-14'
						onClick={() => {
							switch(localStorage.getItem('user_type')) {
								case 'user':
									loginMutattionUser.mutate({
										auth: {
											phone: sessionStorage.getItem('signup_phone'),
											sms_pin: smsCode,
										},
									});
									break;
								case 'employer':
									loginMutattionEmployer.mutate({
										auth: {
											phone: sessionStorage.getItem('signup_phone'),
											sms_pin: smsCode,
										},
									});
									break;
							}
						}}
					>
						Подтвердить
					</Button>
				)}
		</aside>
	);
};

export default SmsCodeModal;
