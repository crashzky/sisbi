import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStep6Modal.props';

import Step1Image from '../../assets/signup_steps/1.svg';
import Radio from '../../components/Radio';
import Paragraph from '../../components/Paragraph';
import Checkbox from '../../components/Checkbox';

const SingupStep6Modal: React.FC<Props> = () => {
	return (
		<SignupStepLayout
			label='Выберите условия работы'
			currentStep={6}
			maxSteps={7}
			HeaderImage={Step1Image}
			onClickBack={() => console.log('back')}
			onClickContinue={() => console.log('continue')}
		>
			<div className='grid grid-cols-2'>
				<div className='grid gap-3'>
					<Paragraph variant='4' tag='h3' className='font-semibold'>
						График работы
					</Paragraph>
					<Checkbox label='Удалённая работа' />
					<Checkbox label='Полный день' />
					<Checkbox label='Сменный график' />
					<Checkbox label='Гибкий график' />
				</div>
				<div className='grid gap-3'>
					<Paragraph variant='4' tag='h3' className='font-semibold'>
						График занятости
					</Paragraph>
					<Checkbox label='Полная занятость' />
					<Checkbox label='Частичная занятость' />
					<Checkbox label='Проектная работа' />
					<Checkbox label='Стажировка' />
				</div>	
			</div>
		</SignupStepLayout>
	);
};

export default SingupStep6Modal;
