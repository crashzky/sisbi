import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStep3Modal.props';

import Step3Image from '../../assets/signup_steps/3.svg';
import Input from '../../components/Input';

const SingupStep3Modal: React.FC<Props> = () => {
	return (
		<SignupStepLayout
			label='Ваш email-адрес'
			currentStep={3}
			maxSteps={7}
			HeaderImage={Step3Image}
			onClickBack={() => console.log('back')}
			onClickContinue={() => console.log('continue')}
		>
			<Input type='email' placeholder='Email-адрес' />
		</SignupStepLayout>
	);
};

export default SingupStep3Modal;
