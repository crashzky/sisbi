import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStep3Modal.props';
import Input from '../../components/Input';
import { useRouter } from 'next/router';

import Step3Image from '../../assets/signup_steps/3.svg';

const SingupStep3Modal: React.FC<Props> = () => {
	const router = useRouter();

	return (
		<SignupStepLayout
			label='Ваш email-адрес'
			currentStep={3}
			maxSteps={7}
			HeaderImage={Step3Image}
			onClickBack={() => router.push({ pathname: '/', query: { modal: 'signup2' } })}
			onClickContinue={() => router.push({ pathname: '/', query: { modal: 'signup4' } })}
		>
			<Input type='email' placeholder='Email-адрес' />
		</SignupStepLayout>
	);
};

export default SingupStep3Modal;
