import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStep4Modal.props';
import Select from '../../components/Select';
import { DAYS, MONTHS, YEARS } from '../../shared/consts/time';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ISelectOption } from '../../components/Select/Select.props';
import Paragraph from '../../components/Paragraph';
import { useMutation } from 'react-query';
import { putProfileUser } from '../../shared/api/user';

import Step4Image from '../../assets/signup_steps/4.svg';

const SingupStep4Modal: React.FC<Props> = () => {
	const router = useRouter();

	const [day, setDay] = useState<ISelectOption>();
	const [month, setMonth] = useState<ISelectOption>();
	const [year, setYear] = useState<ISelectOption>();

	const [isError, setIsError] = useState(false);

	const { mutate, isLoading } = useMutation(putProfileUser, {
		onSuccess: () => {
			router.push(router.pathname + '/?modal=signup5');
		},
	});

	return (
		<SignupStepLayout
			label='Дата вашего рождения'
			currentStep={4}
			maxSteps={7}
			HeaderImage={Step4Image}
			isLoading={isLoading}
			onClickBack={() => router.push(router.pathname + '/?modal=signup3')}
			onClickContinue={() => {
				if(day && month && year) {
					setIsError(false);
					mutate({
						user: {
							birthday: `${day.value}.${month.value}.${year.value}`,
						},
					});
				}
				else
					setIsError(true);
			}}
		>
			<div className='grid grid-cols-3 gap-2'>
				<Select
					isSearchable={false}
					placeholder='День'
					value={day}
					onChange={setDay}
					options={DAYS.map((i) => ({ value: i, label: i }))} />
				<Select
					isSearchable={false}
					placeholder='Месяц'
					value={month}
					onChange={setMonth}
					options={MONTHS.map((i, num) => ({ value: (num + 1).toString(), label: i }))} />
				<Select
					isSearchable={false}
					placeholder='Год'
					value={year}
					onChange={setYear}
					options={YEARS.map((i) => ({ value: i, label: i }))} />
			</div>
			{isError && (
				<Paragraph variant='5' tag='p' className='text-center text-red mt-5'>
					Заполните все поля
				</Paragraph>
			)}
		</SignupStepLayout>
	);
};

export default SingupStep4Modal;
