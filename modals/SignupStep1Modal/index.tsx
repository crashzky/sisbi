import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStep1Modal.props';
import Radio from '../../components/Radio';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { putProfile } from '../../shared/api/user';
import { useState } from 'react';

import Step1Image from '../../assets/signup_steps/1.svg';

const SingupStep1Modal: React.FC<Props> = () => {
	const router = useRouter();

	const [selectedValue, setSelectedValue] = useState();

	const { mutate, isLoading } = useMutation(putProfile, {
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
			onClickContinue={() => mutate({
				user: {
					gender: selectedValue,
				},
			})}
		>
			<Radio
				className='grid gap-3'
				name='sex'
				onChange={(e) => {
					const GENDERS = {
						'Мужской': 'male',
						'Женский': 'female',
					};

					setSelectedValue(GENDERS[e.target.value]);
				}}
				items={['Мужской', 'Женский']} />
		</SignupStepLayout>
	);
};

export default SingupStep1Modal;
