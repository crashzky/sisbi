import Paragraph from '../../components/Paragraph';
import Props from './SmsCodeModal.props';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import SmsCode from '../../components/SmsCode';
import { useTimer } from 'react-timer-hook';
import { useMutation } from 'react-query';
import { getSmsCode, login } from '../../shared/api/auth';
import { useState } from 'react';

import CrossIcon from '../../assets/general/close.svg';
import LoaderIcon from '../../assets/loader.svg';
import { getMyProfile } from '../../shared/api/user';

const SmsCodeModal: React.FC<Props> = ({ className = '', ...props }) => {
	const router = useRouter();

	const [smsCode, setSmsCode] = useState('');

	const { minutes, seconds, restart } = useTimer({ expiryTimestamp: new Date(Date.now() + 120000) });

	function addZero(input: string) {
		return input.length === 2 ? input : '0' + input;
	}

	const getProfileMutattion = useMutation(getMyProfile, {
		onSuccess: (data) => {
			if(!!data.first_name)
				router.push(router.pathname);
			else
				router.push(router.pathname + '/?modal=signup1');
		},
	});

	const getNewCodeMutattion = useMutation(getSmsCode, {
		onSuccess: () => {
			restart(new Date(Date.now() + 120000));
		},
	});

	const loginMutattion = useMutation(login, {
		onSuccess: (data) => {
			localStorage.setItem('access_token', data.access_token);
			getProfileMutattion.mutate();
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
				isDanger={loginMutattion.isError}
				className='mb-3 justify-center'
				onCodeChanged={(code) => setSmsCode(code)} />
			{loginMutattion.isError && (
				<Paragraph variant='5' tag='p' className='text-center text-red'>
					Код не подходит
				</Paragraph>
			)}
			<button
				className='mt-3 mb-6 mx-auto block font-semibold text-xs text-darkBlue'
				onClick={() => {
					if(minutes === 0 && seconds === 0) {
						getNewCodeMutattion.mutate({
							phone: sessionStorage.getItem('signup_phone'),
						});
					}
				}}
			>
				Выслать код повторно
				{(minutes !== 0 && seconds !== 0) && (
					` через ${addZero(minutes.toString())}:${addZero(seconds.toString())}`
				)}
			</button>
			{(loginMutattion.isLoading || getProfileMutattion.isLoading) ? (
				<LoaderIcon className='h-14 w-14 mx-auto' />
			) : (
				<Button
					className='w-full h-14'
					onClick={() => {
						loginMutattion.mutate({
							auth: {
								phone: sessionStorage.getItem('signup_phone'),
								sms_pin: smsCode,
							},
						});
					}}
				>
					Подтвердить
				</Button>
			)}
		</aside>
	);
};

export default SmsCodeModal;
