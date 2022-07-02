import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStep5Modal.props';
import Radio from '../../components/Radio';
import Input from '../../components/Input';
import Paragraph from '../../components/Paragraph';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { putProfileUser } from '../../shared/api/user';
import { useFormik } from 'formik';

import Step5Image from '../../assets/signup_steps/5.svg';

const SingupStep5Modal: React.FC<Props> = () => {
	const router = useRouter();

	const [selectedValue, setSelectedValue] = useState<string>();

	const formik = useFormik({
		initialValues: {
			job: '',
		},
		onSubmit: null,
	});

	const formik2 = useFormik({
		initialValues: {
			minSalary: '',
		},
		onSubmit: null,
	});

	const { mutate, isLoading } = useMutation(putProfileUser, {
		onSuccess: () => {
			router.push(router.pathname + '/?modal=signup6');
		},
	});

	return (
		<SignupStepLayout
			label='Расскажите о вашей професии'
			currentStep={5}
			maxSteps={7}
			HeaderImage={Step5Image}
			isLoading={isLoading}
			onClickBack={() => router.push(router.pathname + '/?modal=signup4')}
			onClickContinue={() => {
				if(formik.isValid && selectedValue && formik.values.job !== '' && formik2.values.minSalary) {
					const EXPERIENCE = {
						'Нет опыта': 'no',
						'1 - 3 года': 'y_1_3',
						'3 - 6 лет': 'y_2_6',
						'более 6 лет': 'more_6',
					};

					mutate({
						user: {
							previous_job: formik.values.job,
							experience: EXPERIENCE[selectedValue],
							min_salary: +formik2.values.minSalary,
						},
					});
				}
			}}
		>
			<form onSubmit={formik.handleSubmit}>
				<Input
					name='job'
					value={formik.values.job}
					onChange={formik.handleChange}
					isDanger={!!formik.errors.job}
					placeholder='Должность'
					className='mb-4' />
			</form>
			<Paragraph variant='4' tag='h3' className='font-bold mb-3'>
				Опыт работы
			</Paragraph>
			<Radio
				className='grid gap-3'
				name='experience'
				value={selectedValue}
				onChange={(e) => setSelectedValue(e.target.value)}
				items={['Нет опыта', '1 - 3 года', '3 - 6 лет', 'более 6 лет']} />
			<form onSubmit={formik2.handleSubmit}>
				<Input
					name='minSalary'
					type='number'
					value={formik2.values.minSalary}
					onChange={formik2.handleChange}
					isDanger={!!formik2.errors.minSalary}
					placeholder='Минимальная зарплата'
					className='mt-4' />
			</form>
		</SignupStepLayout>
	);
};

export default SingupStep5Modal;
