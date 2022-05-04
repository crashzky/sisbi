import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStep4Modal.props';
import Select from '../../components/Select';
import { DAYS, MONTHS, YEARS } from '../../shared/consts/time';

import Step4Image from '../../assets/signup_steps/4.svg';

const SingupStep4Modal: React.FC<Props> = () => {
	return (
		<SignupStepLayout
			label='Дата вашего рождения'
			currentStep={4}
			maxSteps={7}
			HeaderImage={Step4Image}
			onClickBack={() => console.log('back')}
			onClickContinue={() => console.log('continue')}
		>
			<div className='grid grid-cols-3 gap-2'>
				<Select
					isSearchable={false}
					placeholder='День'
					options={DAYS.map((i) => ({ value: i, label: i }))} />
				<Select
					isSearchable={false}
					placeholder='Месяц'
					options={MONTHS.map((i) => ({ value: i, label: i }))} />
				<Select
					isSearchable={false}
					placeholder='Год'
					options={YEARS.map((i) => ({ value: i, label: i }))} />
			</div>
		</SignupStepLayout>
	);
};

export default SingupStep4Modal;
