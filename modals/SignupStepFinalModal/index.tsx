import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStepFinalModal.props';
import Paragraph from '../../components/Paragraph';
import { useRouter } from 'next/router';

import StepFinalImage from '../../assets/signup_steps/final.svg';

const SingupStepFinalModal: React.FC<Props> = () => {
	const router = useRouter();

	return (
		<SignupStepLayout
			HeaderImage={StepFinalImage}
			continueButtonLabel='Искать работу'
			onClickContinue={() => router.push('/')}
		>
			<Paragraph variant='1' tag='p' className='font-semibold'>
				Поздравляем!
				<br />
				Вы успешно прошли регистрацию
			</Paragraph>
		</SignupStepLayout>
	);
};

export default SingupStepFinalModal;
