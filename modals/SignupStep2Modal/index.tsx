import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStep2Modal.props';
import Input from '../../components/Input';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { putProfileUser } from '../../shared/api/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Step2Image from '../../assets/signup_steps/2.svg';

const SingupStep2Modal: React.FC<Props> = () => {
	const router = useRouter();

	const validatiionSchema = Yup.object().shape({
		name: Yup.string().matches(/^[А-Яа-яёЁ]+$/).required(),
		surname: Yup.string().matches(/^[А-Яа-яёЁ]+$/).required(),
	});

	const formik = useFormik({
		initialValues: {
			name: '',
			surname: '',
		},
		validationSchema: validatiionSchema,
		onSubmit: () => {
			mutate({
				user: {
					first_name: formik.values.name,
					surname: formik.values.surname,
				},
			});
		},
	});

	const { mutate, isLoading } = useMutation(putProfileUser, {
		onSuccess: () => {
			router.push(router.pathname + '/?modal=signup3');
		},
	});

	return (
		<SignupStepLayout
			label='Как вас зовут?'
			currentStep={2}
			maxSteps={7}
			HeaderImage={Step2Image}
			isLoading={isLoading}
			onClickBack={() => router.push(router.pathname + '/?modal=signup1')}
			onClickContinue={formik.submitForm}
		>
			<form onSubmit={formik.handleSubmit}>
				<Input
					name='name'
					value={formik.values.name}
					onChange={(formik.handleChange)}
					isDanger={!!formik.errors.name}
					placeholder='Имя'
					className='mb-4' />
				<Input
					name='surname'
					value={formik.values.surname}
					onChange={formik.handleChange}
					isDanger={!!formik.errors.surname}
					placeholder='Фамилия' />
			</form>
		</SignupStepLayout>
	);
};

export default SingupStep2Modal;
