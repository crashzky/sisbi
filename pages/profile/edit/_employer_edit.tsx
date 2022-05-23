import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import Headline from '../../../components/Headline';
import Input from '../../../components/Input';
import InputImage from '../../../components/InputImage';
import Paragraph from '../../../components/Paragraph';
import MainLayout from '../../../layouts/MainLayout';
import { useMutation, useQuery } from 'react-query';
import { getMyProfileEmployer, putProlfileFormDataEmployer } from '../../../shared/api/user';
import * as Yup from 'yup';

import LoaderIcon from '../../../assets/loader.svg';

const EmployerEditPage = (): JSX.Element => {
	const router = useRouter();

	const [prevAvatar, setPrevAvatar] = useState<string>('/assets/no_selected_image.svg');
	const [avatar, setAvatar] = useState<File>();

	useQuery('my_profile_employer', getMyProfileEmployer, {
		onSuccess: (values) => {
			const { email, avatar, name } = values.payload;

			formik.setValues({
				name,
				email,
			});

			if(avatar)
				setPrevAvatar(avatar);
		},
	});

	const putProfileMutation = useMutation(putProlfileFormDataEmployer, {
		onSuccess: () => {
			router.push('/profile');
		},
	});

	const validatiionSchema = Yup.object().shape({
		name: Yup.string().required('required'),
		email: Yup.string().email().required('required'),
	});

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
		},
		validationSchema: validatiionSchema,
		onSubmit: (values) => {
			let withAvatar = avatar ? {
				avatar: avatar as any,
			} : {};
			withAvatar = prevAvatar === null ? {
				avatar: null,
			} : withAvatar;

			putProfileMutation.mutate({
				employer: {
					name: values.name,
					email: values.email,

					...withAvatar,
				},
			});
		},
	});

	return (
		<MainLayout className='bg-[#FAFBFC] pt-10 px-40'>
			<BackButton href='/profile' className='mb-10' />
			<Headline variant='5' tag='h1' className='font-bold mb-10'>
				Основная информация
			</Headline>
			<form onSubmit={formik.handleSubmit}>
				<div className='grid grid-cols-[repeat(2,auto)] gap-x-[100px] gap-y-8 max-w-[650px]'>
					<Paragraph variant='5' tag='p'>
						Логотип компании
					</Paragraph>
					<InputImage
						noSelectedImage={prevAvatar}
						onChange={(e) => setAvatar(e.target.files[0])} />
					<Paragraph variant='5' tag='p'>
						Название компании
					</Paragraph>
					<Input
						value={formik.values.name}
						name='name'
						isDanger={!!formik.errors.name}
						onChange={formik.handleChange}
						placeholder='Иван' />
					<Paragraph variant='5' tag='p'>
						Email-адрес
					</Paragraph>
					<Input
						value={formik.values.email}
						name='email'
						type='email'
						isDanger={!!formik.errors.email}
						onChange={formik.handleChange}
						placeholder='example@mail.ru' />
				</div>
				<div className='grid grid-flow-col w-fit gap-2 mt-8'>
					{putProfileMutation.isLoading ? (
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

export default EmployerEditPage;
