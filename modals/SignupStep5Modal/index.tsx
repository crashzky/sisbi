import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStep5Modal.props';
import Radio from '../../components/Radio';

import Step5Image from '../../assets/signup_steps/5.svg';
import Input from '../../components/Input';
import Paragraph from '../../components/Paragraph';

const SingupStep5Modal: React.FC<Props> = () => {
	return (
		<SignupStepLayout
			label='Расскажите о вашей професии'
			currentStep={5}
			maxSteps={7}
			HeaderImage={Step5Image}
			onClickBack={() => console.log('back')}
			onClickContinue={() => console.log('continue')}
		>
			<Input placeholder='Должность' className='mb-4' />
			<Paragraph variant='4' tag='h3' className='font-bold mb-3'>
				Опыт работы
			</Paragraph>
			<Radio
				className='grid gap-3'
				name='experience'
				items={['Нет опыта', '1 - 3 года', '2 - 6 лет', 'более 6 лет']} />
		</SignupStepLayout>
	);
};

export default SingupStep5Modal;
