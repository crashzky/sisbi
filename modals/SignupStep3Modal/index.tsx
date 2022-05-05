import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStep3Modal.props';
import Input from '../../components/Input';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { putProfile } from '../../shared/api/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Step3Image from '../../assets/signup_steps/3.svg';

const SingupStep3Modal: React.FC<Props> = () => {
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

	const { mutate, isLoading } = useMutation(putProfile, {
		onSuccess: () => {
			router.push(router.pathname + '/?modal=signup4');
		},
	});

	return (
		<SignupStepLayout
			label='Ваш email-адрес'
			currentStep={3}
			maxSteps={7}
			HeaderImage={Step3Image}
			isLoading={isLoading}
			onClickBack={() => router.push(router.pathname + '/?modal=signup2')}
			onClickContinue={() => {
				if(formik.isValid) {
					mutate({
						user: {
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

export default SingupStep3Modal;
