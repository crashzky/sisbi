import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Headline from '../../components/Headline';
import MainLayout from '../../layouts/MainLayout';
import { DRIVING_LICENSES } from '../../shared/consts/profile';

import LoaderIcon from '../../assets/loader.svg';
import { useMutation, useQuery } from 'react-query';
import { getMyProfileUser, putProfileUser } from '../../shared/api/user';

const DrivingLicensesPage = (): JSX.Element => {
	const router = useRouter();

	useQuery('my_profile_user', getMyProfileUser, {
		onSuccess: (data) => {
			formik.setValues({
				licenses: data.payload.driving_license.split(' ').filter((i) => i !== ''),
			});
		},
	});

	const { mutate, isLoading } = useMutation(putProfileUser, {
		onSuccess: () => router.push('/profile'),
	});
	
	const formik = useFormik({
		initialValues: {
			licenses: [],
		},
		onSubmit: (values) => {
			mutate({
				user: {
					driving_license: values.licenses.sort().join(' '),
				},
			});
		},
	});

	return (
		<MainLayout className='bg-[#FAFBFC] pt-10 px-40'>
			<BackButton href='/profile' className='mb-10' />
			<Headline variant='5' tag='h1' className='font-bold mb-10'>
				Категория водительских прав
			</Headline>
			<form className='grid gap-3' onSubmit={formik.handleSubmit}>
				{DRIVING_LICENSES.map((i, num) => (
					<Checkbox
						name='licenses'
						onChange={formik.handleChange}
						key={num}
						checked={formik.values.licenses.includes(i)}
						label={i}
						value={i} />
				))}
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

export default DrivingLicensesPage;
