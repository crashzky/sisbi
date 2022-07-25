import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import Button from '../../components/Button';
import Select from '../../components/Select';
import { ISelectOption } from '../../components/Select/Select.props';
import { getCities, getCityById } from '../../shared/api/cities';
import { getSuggestions } from '../../shared/api/vacancies_suggestions';
import Props from './SearchPanel.props';

const SearchPanel: React.FC<Props> = ({ className = '', ...props }) => {
	const router = useRouter();

	const [city, setCity] = useState<ISelectOption>();
	const [suggestion, setSuggestion] = useState<ISelectOption>();
	const [suggestRequest, setSuggestRequest] = useState<string>();

	const citiesMutation = useMutation(getCities);
	const suggestsMutation = useMutation(getSuggestions);

	useEffect(() => {
		citiesMutation.mutate({ name: '' });
		suggestsMutation.mutate({ name: '' });

		if(router.query && router.query.query) {
			formik.setValues({
				query: router.query.query.toString(),
			});
		}

		if(router.query && router.query.city) {
			getCityById({ id: +router.query.city })
				.then((res) => setCity({ value: res.payload.id.toString(), label: res.payload.name }));
		}
		
		if(router.query && router.query.query) {
			getSuggestions({ name: router.query.query as string })
				.then((res) => {
					if(res.total_entries && router.query.query === res.payload[0].name)
						setSuggestion({ value: res.payload[0].id.toString(), label: res.payload[0].name });
					else if(res.total_entries)
						setSuggestion({ value: router.query.query as string, label: router.query.query as string });
				});
		}
	}, [router]);

	const formik = useFormik({
		initialValues: {
			query: '',
		},
		onSubmit: () => {
			router.push({
				pathname: router.pathname.includes('resumes') ? '/resumes' : '/vacancies',
				query: {
					query: suggestion.label,
					city: city ? city.value : null,
				},
			});
		},
	});

	function getSuggestOptions() {
		if(suggestsMutation.isSuccess && suggestRequest) {
			return [
				{ value: suggestRequest, label: suggestRequest },
				...suggestsMutation.data.payload.map((i) => ({ value: i.id.toString(), label: i.name })),
			];
		}
		else if(suggestsMutation.isSuccess)
			return suggestsMutation.data.payload.map((i) => ({ value: i.id.toString(), label: i.name }));
		else 
			return [];
	}

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
				<Select
					variant='with_gap'
					placeholder='Название должности'
					onInputChange={(newValue) => {
						if(newValue)
							setSuggestRequest(newValue);
						else
							setSuggestRequest(undefined);

						suggestsMutation.mutate({ name: newValue });
					}}
					noOptionsMessage={() => 'Ничего не найдено'}
					loadingMessage={() => 'Загрузка...'}
					isLoading={suggestsMutation.isLoading}
					value={suggestion}
					onChange={setSuggestion}
					options={getSuggestOptions()} />
				{/*
					<Input
						className='py-0 bg-white'
						name='query'
						value={formik.values.query}
						onChange={formik.handleChange}
						outline={false}
						placeholder='Название должности' />
				*/}
				<Button type='submit' variant='outline' className='w-[104px] h-12'>
					Найти
				</Button>
			</form>
		</section>
	);
};

export default SearchPanel;
