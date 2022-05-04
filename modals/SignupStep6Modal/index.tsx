import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStep6Modal.props';
import Paragraph from '../../components/Paragraph';
import Checkbox from '../../components/Checkbox';
import { useRouter } from 'next/router';

import Step1Image from '../../assets/signup_steps/1.svg';

const SingupStep6Modal: React.FC<Props> = () => {
	const router = useRouter();

	return (
		<SignupStepLayout
			label='Выберите условия работы'
			currentStep={6}
			maxSteps={7}
			HeaderImage={Step1Image}
			onClickBack={() => router.push({ pathname: '/', query: { modal: 'signup5' } })}
			onClickContinue={() => router.push({ pathname: '/', query: { modal: 'signupFinal' } })}
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
