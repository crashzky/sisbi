import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Headline from '../../components/Headline';
import Input from '../../components/Input';
import Paragraph from '../../components/Paragraph';
import Radio from '../../components/Radio';
import Switch from '../../components/Switch';
import MainLayout from '../../layouts/MainLayout';
import { useFormik } from 'formik';
import { useQuery } from 'react-query';
import { getSchedules } from '../../shared/api/schedules';
import { getTypeEmployments } from '../../shared/api/type_employments';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getMyProfile } from '../../shared/api/user';
import { EXPERIENCE } from '../../shared/consts/profile';
import SkillsSelectPage from './_skills_select';
import ModalLayout from '../../layouts/ModalLayout';
import ProfileSelectJobModal from '../../modals/ProfileSelectJobModal';

import CloseIcon from '../../assets/general/close.svg';
import { getJobCategories } from '../../shared/api/job_categories';

const ResumePage = (): JSX.Element => {
	const router = useRouter();

	const [skills, setSkills] = useState([]);
	const [showSkillsSelect, setShowSkillsSelect] = useState(false);

	const [jobCategory, setJobCategory] = useState(null);
	const [showJobSelect, setShowJobSelect] = useState(false);

	const profileQuery = useQuery('my_profile', getMyProfile, {
		onSuccess: (value) => {
			formik.setValues({
				vacancyName: value.previous_job,
				minPrice: value.min_salary,
				experience: EXPERIENCE[value.experience],
				employement_type: [],
				schedule: [],
				ready_move: value.ready_move ? ['on'] : [],
				ready_mission: value.ready_mission ? ['on'] : [],
			});

			if(profileQuery.isIdle)
				setSkills(value.skills.split(' ').filter((i) => i !== ''));
		},
	});

	const jobCategoriesQuery = useQuery('job_categories', getJobCategories, {
		initialData: [],
	});

	const schedulesQuery = useQuery('schedules', getSchedules, {
		initialData: [],
	});

	const typeEmploymentsQuery = useQuery('type_employments', getTypeEmployments, {
		initialData: [],
	});

	const formik = useFormik({
		initialValues: {
			vacancyName: '',
			minPrice: null,
			experience: null,
			employement_type: [],
			schedule: [],
			ready_move: [],
			ready_mission: [],
		},
		onSubmit: null,
	});

	useEffect(() => {
		if(!localStorage.getItem('access_token'))
			router.push('/?modal=login');
	}, [router]);

	if(showSkillsSelect) {
		return (
			<SkillsSelectPage
				skills={skills}
				onClickBack={() => setShowSkillsSelect(false)}
				onContinue={(skills) => {
					setShowSkillsSelect(false);
					setSkills(skills);
				}} />
		);
	}
	else {
		return (
			<ModalLayout
				openedModal={showJobSelect && 'job_category'}
				modals={{
					'job_category': <ProfileSelectJobModal
						selected={jobCategoriesQuery.isSuccess
							? jobCategoriesQuery.data.find((i) => i.id === jobCategory).name
							: null}
						onCloseModal={() => setShowJobSelect(false)}
						onContinue={(id) => {
							setJobCategory(id);
							setShowJobSelect(false);
						}} />,
				}}
			>
				<MainLayout className='bg-[#FAFBFC] pt-10 px-40'>
					<BackButton href='/profile' className='mb-10' />
					<Headline variant='5' tag='h1' className='font-bold mb-10'>
						Желаемая должность
					</Headline>
					<form onSubmit={formik.handleSubmit}>
						<div className='grid grid-cols-[repeat(2,auto)] gap-x-[100px] gap-y-8 max-w-[650px]'>
							<Paragraph variant='5' tag='p'>
								Желаемая должность	
							</Paragraph>
							<Input
								value={formik.values.vacancyName}
								name='vacancyName'
								onChange={formik.handleChange}
								placeholder='UX/UI дизайнер' />
							<Paragraph variant='5' tag='p'>
								Сфера деятельности	
							</Paragraph>
							{(jobCategory || jobCategory === 0) && jobCategoriesQuery.isSuccess ? (
								<div className='grid gap-2 grid-flow-col'>
									<div className='bg-gray-40 py-3 px-4 rounded-lg'>
										{jobCategoriesQuery.data.find((i) => i.id === jobCategory).name}
									</div>
									<Button
										variant='outline_secondary'
										className='font-normal'
										onClick={() => setShowJobSelect(true)}
									>
										Изменить
									</Button>
								</div>
							) : (
								<Button
									variant='secondary'
									className='h-8 w-[88px] font-normal'
									onClick={() => setShowJobSelect(true)}
								>
									Выбрать
								</Button>
							)}
							<Paragraph variant='5' tag='p'>
								Зарплата, от	
							</Paragraph>
							<Input
								type='number'
								value={formik.values.minPrice}
								name='minPrice'
								onChange={formik.handleChange}
								placeholder='150 000 ₽' />
							<Paragraph variant='5' tag='p'>
								Опыт работы	
							</Paragraph>
							<div>
								<Radio
									className='grid gap-3'
									name='experience'
									value={formik.values.experience}
									onChange={formik.handleChange}
									items={['Нет опыта', '1 - 3 года', '3 - 6 лет', 'Более 6 лет']} />
							</div>
							<Paragraph variant='5' tag='p'>
								Тип занятости	
							</Paragraph>
							<div className='grid gap-3'>
								{typeEmploymentsQuery.data.map((i) => (
									<Checkbox
										key={i.id}
										value={i.id}
										name='employement_type'
										label={i.name} />
								))}
							</div>
							<Paragraph variant='5' tag='p'>
								График работы	
							</Paragraph>
							<div className='grid gap-3'>
								{schedulesQuery.data.map((i) => (
									<Checkbox
										key={i.id}
										value={i.id}
										name='schedule'
										label={i.name} />
								))}
							</div>
							<Paragraph variant='5' tag='p'>
								Командировки и переезд
							</Paragraph>
							<div className='grid grid-cols-2 gap-x-3 gap-y-[17px]'>
								<Paragraph variant='5' tag='p'>
									Готов к командировкам
								</Paragraph>
								<Switch
									checked={!!formik.values.ready_mission.length}
									onChange={formik.handleChange}
									name='ready_mission'
									id='missions' />
								<Paragraph variant='5' tag='p'>
									Готов к переезду
								</Paragraph>
								<Switch
									checked={!!formik.values.ready_move.length}
									onChange={formik.handleChange}
									name='ready_move'
									id='move' />
							</div>
							<Paragraph variant='5' tag='p'>
								Профессиональные навыки
							</Paragraph>
							<div>
								<div className='flex flex-wrap gap-2 mb-4'>
									{skills.map((i, num) => (
										<span key={num} className='bg-softGold py-1 px-2 grid grid-cols-[1fr_auto] gap-3 rounded'>
											{i}
											<button onClick={() => setSkills((prev) => prev.filter((j) => j !== i))}>
												<CloseIcon className='fill-icon-secondary' />
											</button>
										</span>
									))}
								</div>
								<Button variant='secondary' className='h-8 w-[138px]' onClick={() => setShowSkillsSelect(true)}>
									Добавить навык
								</Button>
							</div>
						</div>
						<div className='grid grid-flow-col w-fit gap-2 mt-8'>
							<Button className='h-12 w-[209px]'>
								Сохранить изменения
							</Button>
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
			</ModalLayout>
		);
	}
};

export default ResumePage;
