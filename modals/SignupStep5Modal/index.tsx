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
import Select from '../../components/Select';
import { getSuggestions } from '../../shared/api/vacancies_suggestions';

import Step5Image from '../../assets/signup_steps/5.svg';
import { ISelectOption } from '../../components/Select/Select.props';

const SingupStep5Modal: React.FC<Props> = () => {
	const router = useRouter();

	const [selectedValue, setSelectedValue] = useState<string>();
	const [suggestion, setSuggestion] = useState<ISelectOption>();

	const formik = useFormik({
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

	const suggestsMutation = useMutation(getSuggestions);

	return (
		<SignupStepLayout
			label='Расскажите о вашей професии'
			currentStep={5}
			maxSteps={7}
			HeaderImage={Step5Image}
			isLoading={isLoading}
			onClickBack={() => router.push(router.pathname + '/?modal=signup4')}
			onClickContinue={() => {
				if(suggestion && selectedValue && formik.values.minSalary) {
					const EXPERIENCE = {
						'Нет опыта': 'no',
						'1 - 3 года': 'y_1_3',
						'3 - 6 лет': 'y_2_6',
						'более 6 лет': 'more_6',
					};

					mutate({
						user: {
							previous_job: suggestion.label,
							experience: EXPERIENCE[selectedValue],
							min_salary: +formik.values.minSalary,
						},
					});
				}
			}}
		>
			<Select
				variant='primary'
				placeholder='Название должности'
				onInputChange={(newValue) => suggestsMutation.mutate({ name: newValue })}
				noOptionsMessage={() => 'Ничего не найдено'}
				loadingMessage={() => 'Загрузка...'}
				isLoading={suggestsMutation.isLoading}
				value={suggestion}
				onChange={setSuggestion}
				options={suggestsMutation.isSuccess
					? suggestsMutation.data.payload.map((i) => ({ value: i.id.toString(), label: i.name }))
					: []} />
			<Paragraph variant='4' tag='h3' className='font-bold my-3'>
				Опыт работы
			</Paragraph>
			<Radio
				className='grid gap-3'
				name='experience'
				value={selectedValue}
				onChange={(e) => setSelectedValue(e.target.value)}
				items={['Нет опыта', '1 - 3 года', '3 - 6 лет', 'более 6 лет']} />
			<form onSubmit={formik.handleSubmit}>
				<Input
					name='minSalary'
					type='number'
					value={formik.values.minSalary}
					onChange={formik.handleChange}
					isDanger={!!formik.errors.minSalary}
					placeholder='Минимальная зарплата'
					className='mt-4' />
			</form>
		</SignupStepLayout>
	);
};

export default SingupStep5Modal;
