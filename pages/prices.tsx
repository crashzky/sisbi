import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import Headline from '../components/Headline';
import Paragraph from '../components/Paragraph';
import TarifCard from '../components/TarifCard';
import TarifCheckbox from '../components/TarifCheckbox';
import MainLayout from '../layouts/MainLayout';
import { getMyVacancies } from '../shared/api/vacancies';
import { IVacancy } from '../shared/types/api/vacancies';
import Button from '../components/Button';

import LoaderIcon from '../assets/loader.svg';

const PricesPage = (): JSX.Element => {
	const [vacancies, setVacancies] = useState<IVacancy[]>([]);
	const [selectedTarif, setSelectedTarif] = useState(0);

	const getVacanciesMutation = useMutation(getMyVacancies, {
		onSuccess: (res) => {
			setVacancies((prev) => {
				let vacancies = [...prev];
				
				res.payload.forEach((i) => {
					if(!vacancies.find((j) => j.id === i.id))
						vacancies.push(i);
				});

				return vacancies;
			});

			if(res.total_pages - res.current_page > 0) {
				getVacanciesMutation.mutate({
					queryKey: [
						{
							page: res.current_page + 1,
						},
					],
				});
			}
		},
	});

	const formik = useFormik({
		initialValues: {
			vacancies: [],
		},
		onSubmit: null,
	});

	useEffect(() => {
		getVacanciesMutation.mutate({
			queryKey: [
				{
					page: 1,
				},
			],
		});
	}, []);

	return (
		<MainLayout className='bg-[#FAFBFC] pt-10 px-40'>
			<Headline variant='5' tag='h1' className='font-bold mb-10'>
				Оплата тарифа
			</Headline>
			<form onSubmit={formik.handleSubmit}>
				<div className='grid grid-cols-[repeat(2,auto)] gap-x-[100px] gap-y-8 max-w-[650px]'>
					<Paragraph variant='5' tag='p' className='w-fit'>
						Выберите тариф
					</Paragraph>
					<div className='grid gap-2'>
						<TarifCard
							isActive={selectedTarif === 0}
							onClick={() => setSelectedTarif(0)}
							label='Тариф “Все отклики на вакансию”'
							priceTitle='700 ₽ за вакансию'
							description={`Получите доступ ко всем откликам на определнной вакансии
								+ на все отклики, которые будут поступать следующие 7 дней`} />
						<TarifCard
							isActive={selectedTarif === 1}
							onClick={() => setSelectedTarif(1)}
							label='Тариф “Все отклики на все вакансии”'
							priceTitle='5.000 ₽ за все вакансии'
							description={`Получите доступ ко всем откликам на все вакансии
								+ на все отклики, которые будут поступать следующие 7 дней`} />
					</div>
					<Paragraph variant='5' tag='p' className='w-fit'>
						Выберите вакансии
					</Paragraph>
					<div className='grid gap-4'>
						{vacancies.map((i, num) => (
							<TarifCheckbox
								key={num}
								value={i.id.toString()}
								checked={formik.values.vacancies.includes(i.id.toString())}
								name='vacancies'
								onChange={formik.handleChange}
								label={i.title}
								subLabel='У вас 25+ откликов на этой вакансии' />
						))}
					</div>
				</div>
				<div className='grid grid-flow-col w-fit gap-2 mt-8'>
					{false ? (
						<LoaderIcon className='h-12 w-[209px]' />
					) : (
						<Button className='h-12 w-[273px]'>
							Оплатить тариф на сумму 700 ₽
						</Button>
					)}
					<Button
						type='button'
						variant='secondary'
						className='h-12 w-[114px]'
						onClick={() => formik.resetForm()}
					>
						Очистить все
					</Button>
				</div>
			</form>
		</MainLayout>
	);
};

export default PricesPage;
