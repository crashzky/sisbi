import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStep1Modal.props';
import Radio from '../../components/Radio';
import { useRouter } from 'next/router';

import Step1Image from '../../assets/signup_steps/1.svg';

const SingupStep1Modal: React.FC<Props> = () => {
	const router = useRouter();

	return (
		<SignupStepLayout
			label='Выберите ваш пол'
			currentStep={1}
			maxSteps={7}
			HeaderImage={Step1Image}
			onClickContinue={() => router.push({ pathname: '/', query: { modal: 'signup2' } })}
		>
			<Radio
				className='grid gap-3'
				name='sex'
				items={['Мужской', 'Женский']} />
		</SignupStepLayout>
	);
};

export default SingupStep1Modal;
