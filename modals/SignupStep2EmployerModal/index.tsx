import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStep2EmployerModal.props';
import Input from '../../components/Input';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { putProfileEmployer } from '../../shared/api/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Step2Image from '../../assets/signup_steps/2.svg';

const SingupStep2EmployerModal: React.FC<Props> = () => {
	const router = useRouter();

	const validatiionSchema = Yup.object().shape({
		name: Yup.string().required(),
	});

	const formik = useFormik({
		initialValues: {
			name: '',
		},
		validationSchema: validatiionSchema,
		onSubmit: () => {
			mutate({
				employer: {
					name: formik.values.name,
				},
			});
		},
	});

	const { mutate, isLoading } = useMutation(putProfileEmployer, {
		onSuccess: () => {
			router.push(router.pathname + '/?modal=signupFinal2');
		},
	});

	return (
		<SignupStepLayout
			label='Название организации'
			currentStep={2}
			maxSteps={2}
			HeaderImage={Step2Image}
			isLoading={isLoading}
			onClickBack={() => router.push(router.pathname + '/?modal=signup1employer')}
			onClickContinue={formik.submitForm}
		>
			<form onSubmit={formik.handleSubmit}>
				<Input
					name='name'
					value={formik.values.name}
					isDanger={!!formik.errors.name && !!formik.submitCount}
					onChange={formik.handleChange}
					type='text'
					placeholder='Название организации' />
			</form>
		</SignupStepLayout>
	);
};

export default SingupStep2EmployerModal;
