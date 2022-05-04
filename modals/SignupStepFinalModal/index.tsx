import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStepFinalModal.props';
import Paragraph from '../../components/Paragraph';

import StepFinalImage from '../../assets/signup_steps/final.svg';

const SingupStepFinalModal: React.FC<Props> = () => {
	return (
		<SignupStepLayout
			HeaderImage={StepFinalImage}
			continueButtonLabel='Искать работу'
			onClickContinue={() => console.log('continue')}
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
