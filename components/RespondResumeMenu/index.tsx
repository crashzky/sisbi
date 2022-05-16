import { useFormik } from 'formik';
import Props from './RespondResumeMenu.props';
import Paragraph from '../Paragraph';
import Link from 'next/link';
import Textarea from '../Textarea';
import Checkbox from '../Checkbox';
import Button from '../Button';
import { useRouter } from 'next/router';
import Radio from '../Radio';
import { useMutation } from 'react-query';
import { getMyVacancies } from '../../shared/api/vacancies';
import { useEffect, useState } from 'react';
import { IVacancy } from '../../shared/types/api/vacancies';

import CloseIcon from '../../assets/general/close.svg';

const RespondResumeMenu: React.FC<Props> = ({ className = '', name, surname, vacancyName, minPrice, resumeId,
	onContinue, onBack, ...props }) => {
	const router = useRouter();

	const [vacancies, setVacancies] = useState<IVacancy[]>([]);

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
			message: '',
			selectedVacancy: null,
			allowSendContacts: [],
		},
		onSubmit: (values) => {
			onContinue(values.message, !!values.allowSendContacts.length);
		},
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
		<aside className={className} {...props}>
			<div className='px-6 py-4 flex justify-between items-center border-b-[1px] border-button-secondary'>
				<Paragraph variant='1' tag='h2' className='font-semibold'>
					Приглашение на вакансию
				</Paragraph>
				<button onClick={onBack}>
					<CloseIcon className='fill-icon-secondary' />
				</button>
			</div>
			<form onSubmit={formik.handleSubmit}>
				<div className='px-6 py-4 flex justify-between border-b-[1px] border-button-secondary'>
					<div className='grid gap-1'>
						<Paragraph variant='6' tag='p'>
							{`${name} ${surname}`}
						</Paragraph>
						<Paragraph variant='4' tag='p' className='font-semibold'>
							{vacancyName}
						</Paragraph>
						<Paragraph variant='4' tag='p' className='font-semibold'>
							от
							{' '}
							{new Intl.NumberFormat('ru-RU').format(minPrice)}
							{' ₽'}
						</Paragraph>
					</div>
					<Link href={{
						pathname: `/resumes/${resumeId}`,
						query: router.query,
					}}
					>
						<a target='_blank' className='text-xs text-text'>
							Открыть резюме в новой вкладке
						</a>
					</Link>
				</div>
				<div className='px-6 py-4 border-b-[1px] border-button-secondary grid grid-cols-2'>
					<Paragraph variant='5' tag='p'>
						Вакансия
					</Paragraph>
					<Radio
						className='grid gap-3'
						name='selectedVacancy'
						value={formik.values.selectedVacancy}
						onChange={formik.handleChange}
						items={vacancies.map((i) => i.title)} />
				</div>
				<div className='p-6 border-b-[1px] border-button-secondary'>
					<Textarea
						className='w-full h-[200px] mb-3'
						placeholder='Сообщение соискателю'
						name='message'
						value={formik.values.message}
						onChange={formik.handleChange}
					>

					</Textarea>
					<Checkbox
						name='allowSendContacts'
						onChange={formik.handleChange}
						checked={!!formik.values.allowSendContacts.length}
						label='Предоставить контакты соискателю' />
				</div>
				<div className='px-6 py-4 grid grid-cols-[auto_auto_1fr] gap-[10px]'>
					<Button className='h-9 px-4'>
						Отправить приглашение
					</Button>
					<Button variant='secondary' type='button' className='h-9 px-4' onClick={onBack}>
						Отменить
					</Button>
				</div>
			</form>
		</aside>
	);
};

export default RespondResumeMenu;
