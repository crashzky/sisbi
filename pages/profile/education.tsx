import { useFormik } from 'formik';
import BackButton from '../../components/BackButton';
import Headline from '../../components/Headline';
import Radio from '../../components/Radio';
import MainLayout from '../../layouts/MainLayout';
import { EDUCATION, TO_EDUCATION } from '../../shared/consts/profile';
import Button from '../../components/Button';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { getMyProfileUser, putProfileUser } from '../../shared/api/user';

import LoaderIcon from '../../assets/loader.svg';
import withCheckAuthLayout from '../../layouts/CheckAuthLayout';

const EductionPage = (): JSX.Element => {
	const router = useRouter();
	
	useQuery('my_profile_user', getMyProfileUser, {
		onSuccess: (values) => {
			formik.setValues({
				education: EDUCATION[values.payload.education],
			});
		},
	});

	const { mutate, isLoading } = useMutation(putProfileUser, {
		onSuccess: () => router.push('/profile'),
	});

	const formik = useFormik({
		initialValues: {
			education: null,
		},
		onSubmit: (values) => {
			mutate({
				user: {
					education: TO_EDUCATION[values.education],
				},
			});
		},
	});

	return (
		<MainLayout className='bg-[#FAFBFC] pt-10 px-40'>
			<BackButton href='/profile' className='mb-10' />
			<Headline variant='5' tag='h1' className='font-bold mb-10'>
				Образование
			</Headline>
			<form onSubmit={formik.handleSubmit}>
				<Radio
					className='grid gap-3'
					name='education'
					value={formik.values.education}
					onChange={formik.handleChange}
					items={Object.keys(EDUCATION).map((i) => EDUCATION[i])} />
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

export default withCheckAuthLayout(EductionPage, {
	checkLoggined: true,
	checkUserType: 'user',
});
