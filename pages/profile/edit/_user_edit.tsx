import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import Headline from '../../../components/Headline';
import Input from '../../../components/Input';
import InputImage from '../../../components/InputImage';
import Paragraph from '../../../components/Paragraph';
import Radio from '../../../components/Radio';
import Select from '../../../components/Select';
import { ISelectOption } from '../../../components/Select/Select.props';
import MainLayout from '../../../layouts/MainLayout';
import { DAYS, MONTHS, YEARS } from '../../../shared/consts/time';
import { useMutation, useQuery } from 'react-query';
import { getCities } from '../../../shared/api/cities';
import { getMyProfileUser, putProlfileFormDataUser } from '../../../shared/api/user';
import { GENDERS, TO_GENDERS } from '../../../shared/consts/profile';

import LoaderIcon from '../../../assets/loader.svg';

const UserEditPage = (): JSX.Element => {
	const router = useRouter();

	const [day, setDay] = useState<ISelectOption>();
	const [month, setMonth] = useState<ISelectOption>();
	const [year, setYear] = useState<ISelectOption>();

	const [city, setCity] = useState<ISelectOption>();

	const [prevAvatar, setPrevAvatar] = useState<string>();
	const [avatar, setAvatar] = useState<File>();

	useQuery('my_profile_user', getMyProfileUser, {
		onSuccess: (values) => {
			const { surname, first_name, gender, email, city, birthday, avatar } = values.payload;

			formik.setValues({
				surname,
				name: first_name,
				gender: GENDERS[gender],
				email,
			});

			if(city)
				setCity({ value: city.id.toString(), label: city.name });

			if(birthday) {
				const _birthday = birthday.split('.');
				
				setDay({ value: _birthday[0], label: _birthday[0] });
				setMonth({ value: _birthday[1], label: _birthday[1] });
				setYear({ value: _birthday[2], label: _birthday[2] });
			}

			if(avatar)
				setPrevAvatar(avatar);
		},
	});

	const citiesMutation = useMutation(getCities);

	const putProfileMutation = useMutation(putProlfileFormDataUser, {
		onSuccess: () => {
			router.push('/profile');
		},
	});

	const formik = useFormik({
		initialValues: {
			surname: '',
			name: '',
			gender: '',
			email: '',
		},
		onSubmit: (values) => {
			let withAvatar = avatar ? {
				avatar: avatar as any,
			} : {};
			withAvatar = prevAvatar === null ? {
				avatar: null,
			} : withAvatar;

			putProfileMutation.mutate({
				user: {
					first_name: values.name,
					surname: values.surname,
					email: values.email,
					gender: TO_GENDERS[values.gender],
					city_id: +city.value,
					birthday: `${day.value}.${month.value}.${year.value}`,

					...withAvatar,
				},
			});
		},
	});

	useEffect(() => citiesMutation.mutate({ name: '' }), []);

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
						noSelectedImage={prevAvatar}
						onChange={(e) => setAvatar(e.target.files[0])} />
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
					<Paragraph variant='5' tag='p'>
						Пол
					</Paragraph>
					<Radio
						className='grid gap-3'
						name='gender'
						value={formik.values.gender}
						onChange={formik.handleChange}
						items={['Мужской', 'Женский']} />
					<Paragraph variant='5' tag='p'>
						Дата рождения
					</Paragraph>
					<div className='grid grid-cols-3 gap-2'>
						<Select
							isSearchable={false}
							placeholder='День'
							value={day}
							onChange={setDay}
							options={DAYS.map((i) => ({ value: i, label: i }))} />
						<Select
							isSearchable={false}
							placeholder='Месяц'
							value={month}
							onChange={setMonth}
							options={MONTHS.map((i, num) => ({ value: (num + 1).toString(), label: i }))} />
						<Select
							isSearchable={false}
							placeholder='Год'
							value={year}
							onChange={setYear}
							options={YEARS.map((i) => ({ value: i, label: i }))} />
					</div>
					<Paragraph variant='5' tag='p'>
						Город проживания
					</Paragraph>
					<Select
						placeholder='Город'
						value={city}
						onChange={setCity}
						isLazyLoad
						onInputChange={(newValue) => citiesMutation.mutate({ name: newValue })}
						noOptionsMessage={() => 'Ничего не найдено'}
						loadingMessage={() => 'Загрузка...'}
						isLoading={citiesMutation.isLoading}
						options={citiesMutation.isSuccess
							? citiesMutation.data.payload.map((i) => ({ value: i.id.toString(), label: i.name }))
							: []} />
					<Paragraph variant='5' tag='p'>
						Email-адрес
					</Paragraph>
					<Input
						value={formik.values.email}
						name='email'
						type='email'
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

export default UserEditPage;
