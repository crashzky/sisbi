import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStep2Modal.props';
import Input from '../../components/Input';
import { useRouter } from 'next/router';

import Step2Image from '../../assets/signup_steps/2.svg';

const SingupStep2Modal: React.FC<Props> = () => {
	const router = useRouter();

	return (
		<SignupStepLayout
			label='Как вас зовут?'
			currentStep={2}
			maxSteps={7}
			HeaderImage={Step2Image}
			onClickBack={() => router.push({ pathname: '/', query: { modal: 'signup1' } })}
			onClickContinue={() => router.push({ pathname: '/', query: { modal: 'signup3' } })}
		>
			<Input placeholder='Имя' className='mb-4' />
			<Input placeholder='Фамилия' />
		</SignupStepLayout>
	);
};

export default SingupStep2Modal;
