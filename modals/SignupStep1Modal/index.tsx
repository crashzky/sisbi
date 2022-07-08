import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStep1Modal.props';
import Radio from '../../components/Radio';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { putProfileUser } from '../../shared/api/user';
import { useState } from 'react';

import Step1Image from '../../assets/signup_steps/1.svg';
import { GENDERS, TO_GENDERS } from '../../shared/consts/profile';

const SingupStep1Modal: React.FC<Props> = () => {
	const router = useRouter();

	const [isError, setIsError] = useState(false);
	const [selectedValue, setSelectedValue] = useState();

	const { mutate, isLoading } = useMutation(putProfileUser, {
		onSuccess: () => {
			router.push(router.pathname + '/?modal=signup2');
		},
	});

	return (
		<SignupStepLayout
			label='Выберите ваш пол'
			currentStep={1}
			maxSteps={7}
			HeaderImage={Step1Image}
			isLoading={isLoading}
			onClickContinue={() => {
				if(selectedValue) {
					mutate({
						user: {
							gender: selectedValue,
						},
					});
				}
				else
					setIsError(true);
			}}
		>
			<Radio
				className='grid gap-3'
				name='sex'
				value={selectedValue && GENDERS[selectedValue]}
				onChange={(e) => {
					setSelectedValue(TO_GENDERS[e.target.value]);
					setIsError(false);
				}}
				items={['Мужской', 'Женский']} />
			{isError && (
				<p className='text-center text-red mt-2'>
					Выберите пожалуйста ваш пол
				</p>
			)}
		</SignupStepLayout>
	);
};

export default SingupStep1Modal;
