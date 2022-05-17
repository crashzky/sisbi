import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { ISelectOption } from '../../components/Select/Select.props';
import { getCities, getCityById } from '../../shared/api/cities';
import Props from './SearchPanel.props';

const SearchPanel: React.FC<Props> = ({ className = '', ...props }) => {
	const router = useRouter();

	const [city, setCity] = useState<ISelectOption>();

	const citiesMutation = useMutation(getCities);

	useEffect(() => {
		citiesMutation.mutate({ name: '' });

		if(router.query && router.query.query) {
			formik.setValues({
				query: router.query.query.toString(),
			});
		}

		if(router.query && router.query.city) {
			getCityById({ id: +router.query.city })
				.then((res) => setCity({ value: res.payload.id.toString(), label: res.payload.name }));
		}
	}, [router]);

	const formik = useFormik({
		initialValues: {
			query: '',
		},
		onSubmit: (values) => {
			router.push({
				pathname: '/vacancies',
				query: {
					query: values.query,
					city: city ? city.value : null,
				},
			});
		},
	});

	return (
		<section className={className + ' bg-darkBlue py-4 px-40'} {...props}>
			<form onSubmit={formik.handleSubmit} className='grid grid-cols-between gap-4'>
				<div className='w-[195px]'>
					<Select
						variant='with_gap'
						placeholder='Ваш город'
						isLazyLoad
						onInputChange={(newValue) => citiesMutation.mutate({ name: newValue })}
						noOptionsMessage={() => 'Ничего не найдено'}
						loadingMessage={() => 'Загрузка...'}
						isLoading={citiesMutation.isLoading}
						value={city}
						onChange={setCity}
						options={citiesMutation.isSuccess
							? citiesMutation.data.payload.map((i) => ({ value: i.id.toString(), label: i.name }))
							: []} />
				</div>
				{/*<Select
					variant='with_gap'
					placeholder='Название должности'
					options={[]} />*/}
				<Input
					className='py-0 bg-white'
					name='query'
					value={formik.values.query}
					onChange={formik.handleChange}
					outline={false}
					placeholder='Название должности' />
				<Button type='submit' variant='outline' className='w-[104px] h-12'>
					Найти
				</Button>
			</form>
		</section>
	);
};

export default SearchPanel;
