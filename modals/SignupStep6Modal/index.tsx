import SignupStepLayout from '../../layouts/SignupStepLayout';
import Props from './SignupStep6Modal.props';
import Paragraph from '../../components/Paragraph';
import Checkbox from '../../components/Checkbox';
import { useRouter } from 'next/router';

import Step1Image from '../../assets/signup_steps/1.svg';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { putProfile } from '../../shared/api/user';

const SingupStep6Modal: React.FC<Props> = () => {
	const router = useRouter();

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
				router.push(router.pathname + '/?modal=signupFinal');
			}}
		>
			<form onSubmit={formik.handleSubmit} className='grid grid-cols-2'>
				<div className='grid gap-3'>
					<Paragraph variant='4' tag='h3' className='font-semibold'>
						График работы
					</Paragraph>
					<Checkbox
						name='schedule'
						onChange={formik.handleChange}
						value='Удалённая работа'
						label='Удалённая работа' />
					<Checkbox
						name='schedule'
						onChange={formik.handleChange}
						value='Полный день'
						label='Полный день' />
					<Checkbox
						name='schedule'
						onChange={formik.handleChange}
						value='Сменный график'
						label='Сменный график' />
					<Checkbox
						name='schedule'
						onChange={formik.handleChange}
						value='Гибкий график'
						label='Гибкий график' />
				</div>
				<div className='grid gap-3'>
					<Paragraph variant='4' tag='h3' className='font-semibold'>
						График занятости
					</Paragraph>
					<Checkbox
						name='employment'
						onChange={formik.handleChange}
						value='Полная занятость'
						label='Полная занятость' />
					<Checkbox
						name='employment'
						onChange={formik.handleChange}
						value='Частичная занятость'
						label='Частичная занятость' />
					<Checkbox
						name='employment'
						onChange={formik.handleChange}
						value='Проектная работа'
						label='Проектная работа' />
					<Checkbox
						name='employment'
						onChange={formik.handleChange}
						value='Стажировка'
						label='Стажировка' />
				</div>	
			</form>
		</SignupStepLayout>
	);
};

export default SingupStep6Modal;
