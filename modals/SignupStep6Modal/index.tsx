import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStep6Modal.props';
import Paragraph from '../../components/Paragraph';
import Checkbox from '../../components/Checkbox';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useMutation, useQuery } from 'react-query';
import { putProfile } from '../../shared/api/user';
import { getSchedules } from '../../shared/api/schedules';

import Step1Image from '../../assets/signup_steps/1.svg';
import { getTypeEmployments } from '../../shared/api/type_employments';

const SingupStep6Modal: React.FC<Props> = () => {
	const router = useRouter();
	
	const schedulesQuery = useQuery('schedules', getSchedules, {
		initialData: [],
	});
	const typeEmploymentsQuery = useQuery('type_employments', getTypeEmployments, {
		initialData: [],
	});

	const formik = useFormik({
		initialValues: {
			schedule: [],
			employment: [],
		},
		onSubmit: null,
	});

	const { mutate, isLoading } = useMutation(putProfile, {
		onSuccess: () => {
			router.push(router.pathname + '/?modal=signupFinal');
		},
	});

	return (
		<SignupStepLayout
			label='Выберите условия работы'
			currentStep={6}
			maxSteps={7}
			HeaderImage={Step1Image}
			isLoading={isLoading}
			onClickBack={() => router.push(router.pathname + '/?modal=signup5')}
			onClickContinue={() => {
				/*mutate({
					user: {

					},
				});*/
				//router.push(router.pathname + '/?modal=signupFinal');
			}}
		>
			<form onSubmit={formik.handleSubmit} className='grid grid-cols-2'>
				<div className='grid gap-3'>
					<Paragraph variant='4' tag='h3' className='font-semibold'>
						График работы
					</Paragraph>
					{schedulesQuery.data.map((i) => (
						<Checkbox
							key={i.id}
							name='schedule'
							onChange={formik.handleChange}
							value={i.id}
							label={i.name} />
					))}
				</div>
				<div className='grid gap-3'>
					<Paragraph variant='4' tag='h3' className='font-semibold'>
						График занятости
					</Paragraph>
					{typeEmploymentsQuery.data.map((i) => (
						<Checkbox
							key={i.id}
							name='employment'
							onChange={formik.handleChange}
							value={i.id}
							label={i.name} />
					))}
				</div>	
			</form>
		</SignupStepLayout>
	);
};

export default SingupStep6Modal;
