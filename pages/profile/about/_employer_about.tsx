import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import BackButton from '../../../components/BackButton';
import Headline from '../../../components/Headline';
import Textarea from '../../../components/Textarea';
import MainLayout from '../../../layouts/MainLayout';
import { getMyProfileEmployer, putProfileEmployer } from '../../../shared/api/user';
import Button from '../../../components/Button';
import { useFormik } from 'formik';

import LoaderIcon from '../../../assets/loader.svg';

const EmployerAboutPage = (): JSX.Element => {
	const router = useRouter();

	useQuery('my_profile_employer', getMyProfileEmployer, {
		onSuccess: (data) => {
			formik.setValues({
				about: data.payload.about,
			});
		},
	});

	const { mutate, isLoading } = useMutation(putProfileEmployer, {
		onSuccess: () => router.push('/profile'),
	});

	const formik = useFormik({
		initialValues: {
			about: '',
		},
		onSubmit: (values) => {
			mutate({
				employer: {
					about: values.about,
				},
			});
		},
	});

	return (
		<MainLayout className='bg-[#FAFBFC] pt-10 px-40'>
			<BackButton href='/profile' className='mb-10' />
			<Headline variant='5' tag='h1' className='font-bold mb-10'>
				О компании
			</Headline>
			<form onSubmit={formik.handleSubmit}>
				<Textarea
					name='about'
					value={formik.values.about}
					onChange={formik.handleChange}
					className='w-full max-w-[647px] h-[320px]'
					placeholder='Расскажите немного о вашей компании' />
				<div className='grid grid-flow-col w-fit gap-2 mt-8'>
					{isLoading ? (
						<LoaderIcon className='h-12 w-[209px]' />
					) : (
						<Button className='h-12 w-[209px]'>
							Сохранить изменения
						</Button>
					)}
					<Button
						type='button'
						variant='secondary'
						className='h-12 w-[114px]'
						onClick={() => router.push('/profile')}
					>
						Отмена
					</Button>
				</div>
			</form>
		</MainLayout>
	);
};

export default EmployerAboutPage;
