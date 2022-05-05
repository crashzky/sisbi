import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStep2Modal.props';
import Input from '../../components/Input';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { putProfile } from '../../shared/api/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Step2Image from '../../assets/signup_steps/2.svg';

const SingupStep2Modal: React.FC<Props> = () => {
	const router = useRouter();

	const validatiionSchema = Yup.object().shape({
		name: Yup.string().matches(/^[А-Яа-яёЁ]+$/, 'Only russian').required('This field requeres'),
		surname: Yup.string().matches(/^[А-Яа-яёЁ]+$/, 'Only russian').required('This field requeres'),
	});

	const formik = useFormik({
		initialValues: {
			name: '',
			surname: '',
		},
		validationSchema: validatiionSchema,
		onSubmit: null,
	});

	const { mutate, isLoading } = useMutation(putProfile, {
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
			onClickContinue={() => {
				if(formik.isValid) {
					mutate({
						user: {
							first_name: formik.values.name,
							surname: formik.values.surname,
						},
					});
				}
			}}
		>
			<form onSubmit={formik.handleSubmit}>
				<Input
					name='name'
					value={formik.values.name}
					onChange={formik.handleChange}
					isDanger={!!formik.errors.name && !!formik.values.name}
					placeholder='Имя'
					className='mb-4' />
				<Input
					name='surname'
					value={formik.values.surname}
					onChange={formik.handleChange}
					isDanger={!!formik.errors.surname && !!formik.values.surname}
					placeholder='Фамилия' />
			</form>
		</SignupStepLayout>
	);
};

export default SingupStep2Modal;
