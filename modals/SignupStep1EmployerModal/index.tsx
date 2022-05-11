import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStep1EmployerModal.props';
import Input from '../../components/Input';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { putProfileEmployer } from '../../shared/api/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Step3Image from '../../assets/signup_steps/3.svg';

const SingupStep1EmployerModal: React.FC<Props> = () => {
	const router = useRouter();

	const validatiionSchema = Yup.object().shape({
		email: Yup.string().email('incorrect'),
	});

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: validatiionSchema,
		onSubmit: null,
	});

	const { mutate, isLoading } = useMutation(putProfileEmployer, {
		onSuccess: () => {
			router.push(router.pathname + '/?modal=signup2employer');
		},
	});

	return (
		<SignupStepLayout
			label='Ваш email-адрес'
			currentStep={1}
			maxSteps={2}
			HeaderImage={Step3Image}
			isLoading={isLoading}
			onClickContinue={() => {
				if(formik.isValid) {
					mutate({
						employer: {
							email: formik.values.email,
						},
					});
				}
			}}
		>
			<form onSubmit={formik.handleSubmit}>
				<Input
					name='email'
					value={formik.values.email}
					onChange={formik.handleChange}
					type='email'
					placeholder='Email-адрес' />
			</form>
		</SignupStepLayout>
	);
};

export default SingupStep1EmployerModal;
