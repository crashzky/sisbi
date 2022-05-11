import { useFormik } from 'formik';
import { useState } from 'react';
import BackButton from '../../components/BackButton';
import Headline from '../../components/Headline';
import Input from '../../components/Input';
import InputImage from '../../components/InputImage';
import Paragraph from '../../components/Paragraph';
import { ISelectOption } from '../../components/Select/Select.props';
import MainLayout from '../../layouts/MainLayout';

const UserEditPage = (): JSX.Element => {
	const [day, setDay] = useState<ISelectOption>();
	const [month, setMonth] = useState<ISelectOption>();
	const [year, setYear] = useState<ISelectOption>();

	const [city, setCity] = useState<ISelectOption>();

	const formik = useFormik({
		initialValues: {
			avatar: null,
			surname: '',
			name: '',
			gender: '',
			email: '',
			phone: '',
		},
		onSubmit: null,
	});

	return (
		<MainLayout className='bg-[#FAFBFC] pt-10 px-40'>
			<BackButton href='/profile' className='mb-10' />
			<Headline variant='5' tag='h1' className='font-bold mb-10'>
				Личная информация
			</Headline>
			<form onSubmit={formik.handleSubmit}>
				<div className='grid grid-cols-[repeat(2,auto)] gap-x-[100px] gap-y-8 max-w-[650px]'>
					<Paragraph variant='5' tag='p'>
						Фотография
					</Paragraph>
					<InputImage
						name='avatar'
						noSelectedImage='/assets/DEV_ONLY.png'
						onChange={formik.handleChange}
						value={formik.values.avatar} />
					<Paragraph variant='5' tag='p'>
						Фамилия
					</Paragraph>
					<Input
						value={formik.values.surname}
						name='surname'
						onChange={formik.handleChange}
						placeholder='Иванов' />
					<Paragraph variant='5' tag='p'>
						Имя
					</Paragraph>
					<Input
						value={formik.values.name}
						name='name'
						onChange={formik.handleChange}
						placeholder='Иван' />
				</div>
			</form>
		</MainLayout>
	);
};

export default UserEditPage;
