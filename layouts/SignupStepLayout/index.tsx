import Props from './SignupStepLayout.props';
import { useRouter } from 'next/router';
import Paragraph from '../../components/Paragraph';
import Button from '../../components/Button';

import CloseIcon from '../../assets/general/close.svg';
import LoaderIcon from '../../assets/loader.svg';

const SignupStepLayout: React.FC<Props> = ({
	className = '', currentStep, children, maxSteps, label, HeaderImage, isLoading,
	onClickBack, onClickContinue, continueButtonLabel = 'Продолжить', backButtonLabel = 'Назад', ...props }) => {
	const router = useRouter();

	function getContinueButton() {
		if(isLoading)
			return <LoaderIcon className='w-14 h-14 mx-auto' />;
		else if(onClickContinue) {
			return (
				<Button className='h-14' onClick={onClickContinue}>
					{continueButtonLabel}
				</Button>
			);
		}
	}

	return (
		<aside className={className + ' bg-white rounded-2xl w-[457px]'} {...props}>
			<div className='relative bg-[rgb(40,50,68)] rounded-t-2xl'>
				<button className='absolute top-6 right-6' onClick={() => router.push('/')}>
					<CloseIcon className='fill-white' />
				</button>
				<HeaderImage className='mx-auto' />
			</div>
			<div className='p-6 shadow-[inset_0px_-1px_0px_#E0E1E6]'>
				{((currentStep || currentStep === 0) && (maxSteps || maxSteps === 0)) && (
					<Paragraph variant='5' tag='p' className='text-text-secondary mb-2'>
						{`Шаг ${currentStep} из ${maxSteps}`}
					</Paragraph>
				)}
				{label && (
					<Paragraph variant='1' tag='h3' className='font-semibold mb-6'>
						{label}
					</Paragraph>
				)}
				{children}
			</div>
			<div className={'grid gap-2 p-4 ' + (onClickBack && onClickContinue ? 'grid-cols-2' : '')}>
				{onClickBack && (
					<Button variant='secondary' className='h-14' onClick={onClickBack}>
						{backButtonLabel}
					</Button>
				)}
				{getContinueButton()}
			</div>
		</aside>
	);
};

export default SignupStepLayout;
