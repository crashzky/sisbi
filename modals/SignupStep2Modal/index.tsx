import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStep2Modal.props';
import Input from '../../components/Input';

import Step2Image from '../../assets/signup_steps/2.svg';

const SingupStep2Modal: React.FC<Props> = () => {
	return (
		<SignupStepLayout
			label='Как вас зовут?'
			currentStep={2}
			maxSteps={7}
			HeaderImage={Step2Image}
			onClickBack={() => console.log('back')}
			onClickContinue={() => console.log('continue')}
		>
			<Input placeholder='Имя' className='mb-4' />
			<Input placeholder='Фамилия' />
		</SignupStepLayout>
	);
};

export default SingupStep2Modal;
