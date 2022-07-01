import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { ISelectOption } from '../../components/Select/Select.props';
import { getCities, getCityById } from '../../shared/api/cities';
import { getSuggestions } from '../../shared/api/vacancies_suggestions';
import Props from './SearchPanel.props';

const SearchPanel: React.FC<Props> = ({ className = '', ...props }) => {
	const router = useRouter();

	const [city, setCity] = useState<ISelectOption>();
	const [suggestion, setSuggestion] = useState<ISelectOption>();

	const citiesMutation = useMutation(getCities);
	const SuggestsMutation = useMutation(getSuggestions);

	useEffect(() => {
		citiesMutation.mutate({ name: '' });

		if(router.pathname.includes('vacancies'))
			SuggestsMutation.mutate({ name: '' });

		if(router.query && router.query.query) {
			formik.setValues({
				query: router.query.query.toString(),
			});
		}

		if(router.query && router.query.city) {
			getCityById({ id: +router.query.city })
				.then((res) => setCity({ value: res.payload.id.toString(), label: res.payload.name }));
		}
		
		if(router.query && router.query.query && router.pathname.includes('vacancies')) {
			getSuggestions({ name: router.query.query as string })
				.then((res) => setSuggestion({ value: res.payload[0].id.toString(), label: res.payload[0].name }));
		}
	}, [router]);

	const formik = useFormik({
		initialValues: {
			query: '',
		},
		onSubmit: (values) => {
			router.push({
				pathname: router.pathname.includes('resumes') ? '/resumes' : '/vacancies',
				query: {
					query: router.pathname.includes('vacancies') ? suggestion.label : values.query,
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
				{router && router.pathname.includes('vacancies') ? (
					<Select
						variant='with_gap'
						placeholder='Название должности'
						onInputChange={(newValue) => SuggestsMutation.mutate({ name: newValue })}
						noOptionsMessage={() => 'Ничего не найдено'}
						loadingMessage={() => 'Загрузка...'}
						isLoading={SuggestsMutation.isLoading}
						value={suggestion}
						onChange={setSuggestion}
						options={SuggestsMutation.isSuccess
							? SuggestsMutation.data.payload.map((i) => ({ value: i.id.toString(), label: i.name }))
							: []} />
				) : (
					<Input
						className='py-0 bg-white'
						name='query'
						value={formik.values.query}
						onChange={formik.handleChange}
						outline={false}
						placeholder='Название должности' />
				)}
				<Button type='submit' variant='outline' className='w-[104px] h-12'>
					Найти
				</Button>
			</form>
		</section>
	);
};

export default SearchPanel;
