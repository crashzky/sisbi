import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStepFinal2Modal.props';
import Paragraph from '../../components/Paragraph';
import { useRouter } from 'next/router';

import StepFinalImage from '../../assets/signup_steps/final.svg';

const SingupStepFinal2Modal: React.FC<Props> = () => {
	const router = useRouter();

	return (
		<SignupStepLayout
			HeaderImage={StepFinalImage}
			continueButtonLabel='Искать сотрудников'
			onClickContinue={() => router.push('/profile')}
		>
			<Paragraph variant='1' tag='p' className='font-semibold'>
				Поздравляем!
				<br />
				Вы успешно прошли регистрацию
			</Paragraph>
		</SignupStepLayout>
	);
};

export default SingupStepFinal2Modal;
