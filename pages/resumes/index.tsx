import { useRouter } from 'next/router';
import Headline from '../../components/Headline';
import ModalLayout from '../../layouts/ModalLayout';
import SearchLayout from '../../layouts/SearchLayout';
import VacanciesFiltres from '../../layouts/VacanciesFiltres';
import useModal from '../../hooks/useModal';
import { slide as Menu } from 'react-burger-menu';
import { useEffect, useState } from 'react';
import withCheckAuthLayout from '../../layouts/CheckAuthLayout';
import PageSlider from '../../components/PageSlider';
import { useMutation } from 'react-query';
import { getVacancies } from '../../shared/api/vacancies';
import withRouterParam from '../../utils/withRouterParam';
import SelectJobModal from '../../modals/SelectJobModal';
import ResumeCard from '../../components/ResumeCard';
import RespondResumeMenu from '../../components/RespondResumeMenu';

const ResumesPage = (): JSX.Element => {
	const router = useRouter();

	const [respondedResumeId, setRespondedResumeId] = useState(null);

	const { activeModal } = useModal(['job_categories']);

	const { data, mutate, isSuccess } = useMutation(getVacancies);

	useEffect(() => {
		mutate({
			...withRouterParam(router, 'page', 'number'),
			...withRouterParam(router, 'query'),
			...withRouterParam(router, 'city', 'number'),
			...withRouterParam(router, 'salary', 'number'),
			...withRouterParam(router, 'job_category_id', 'array'),
			...withRouterParam(router, 'experience'),
			...withRouterParam(router, 'employment_types', 'array'),
			...withRouterParam(router, 'schedules', 'array'),
		});
	}, [router]);

	function getRoundedStyles(current) {
		let className = [];

		if(current === 0)
			className.push('rounded-t-3xl');
		if(current === (/*data.payload.length*/ 3) - 1)
			className.push('rounded-b-3xl');
		if(current % 2 !== 0 && current !== (/*data.payload.length*/ 3) - 1)
			className.push('border-y-0');
		else if(current === (/*data.payload.length*/ 3) - 1 && current % 2 !== 0)
			className.push('border-t-0');

		return className.join(' ');
	}

	const respondedResume = respondedResumeId ? data.payload.find((i) => i.id === respondedResumeId) : null;

	return (
		<ModalLayout modals={{
			'job_categories': <SelectJobModal />,
		}}
		>
			<Menu
				right
				isOpen={!!respondedResumeId}
				burgerButtonClassName='hidden'
				onClose={() => setRespondedResumeId(null)}
				width={457}
			>
				{(/*respondedResume*/ true) && (
					<RespondResumeMenu
						className='rounded-t-3xl'
						name='Кирилл'
						surname='Шкотлыченко'
						vacancyName='Junior UI/UX дизайнер'
						minPrice={125000}
						resumeId={1}
						onContinue={() => setRespondedResumeId(null)}
						onBack={() => setRespondedResumeId(null)} />
				)}
			</Menu>
			<SearchLayout className='px-40'>
				<Headline variant='5' tag='h1' className='py-10 font-bold'>
					Найдено
					{` ${data && data.total_entries ? data.total_entries : 0} `}
					резюме
				</Headline>
				<div className='grid grid-cols-[216px_1fr] gap-[68px]'>
					<VacanciesFiltres
						variant='resumes'
						style={{
							gap: activeModal && '0px',
						}} />
					<div >
						<div className='grid'>
							<ResumeCard
								onClick={(e) => {
									if((e.target as any).tagName !== 'BUTTON' && (e.target as any).tagName !== 'svg')
										router.push(`/resumes/${0}`);
								}}
								className={getRoundedStyles(0)}
								avatar='/assets/DEV_ONLY.png'
								name='Алексей'
								surname='Шкотлыченко'
								vacancyName='Junior UX/UI дизайнер'
								minSalary={125000}
								about={`
									Плотно взаимодействовать с командой, и корректировать UI в соответствии с возможностями
									современных технологий. Контролировать реализацию UI/UX в конечном продукте.
									Что ты должен знать/уметь: Ты имеешь опыт работы в сфере мобильных IT продуктов в роли UI/UX.
								`}
								tags={['Опыт работы 3 -  6 лет', 'Полный день', 'Удаленная работа', 'Любой город']}
								city='Екатеринбург'
								birthday={new Date(2005, 0, 18)}
								skills={['Figma', 'Photoshop', 'Web-дизайн', 'iOS']}
								onRespond={() => setRespondedResumeId(1)} />
							<ResumeCard
								onClick={(e) => {
									if((e.target as any).tagName !== 'BUTTON' && (e.target as any).tagName !== 'svg')
										router.push(`/resumes/${1}`);
								}}
								className={getRoundedStyles(1)}
								avatar='/assets/DEV_ONLY.png'
								name='Алексей'
								surname='Шкотлыченко'
								vacancyName='Junior UX/UI дизайнер'
								minSalary={125000}
								about={`
									Плотно взаимодействовать с командой, и корректировать UI в соответствии с возможностями
									современных технологий. Контролировать реализацию UI/UX в конечном продукте.
									Что ты должен знать/уметь: Ты имеешь опыт работы в сфере мобильных IT продуктов в роли UI/UX.
								`}
								tags={['Опыт работы 3 -  6 лет', 'Полный день', 'Удаленная работа', 'Любой город']}
								city='Екатеринбург'
								birthday={new Date(2005, 0, 18)}
								skills={['Figma', 'Photoshop', 'Web-дизайн', 'iOS']}
								onRespond={() => setRespondedResumeId(2)} />
							<ResumeCard
								onClick={(e) => {
									if((e.target as any).tagName !== 'BUTTON' && (e.target as any).tagName !== 'svg')
										router.push(`/resumes/${2}`);
								}}
								className={getRoundedStyles(2)}
								avatar='/assets/DEV_ONLY.png'
								name='Алексей'
								surname='Шкотлыченко'
								vacancyName='Junior UX/UI дизайнер'
								minSalary={125000}
								about={`
									Плотно взаимодействовать с командой, и корректировать UI в соответствии с возможностями
									современных технологий. Контролировать реализацию UI/UX в конечном продукте.
									Что ты должен знать/уметь: Ты имеешь опыт работы в сфере мобильных IT продуктов в роли UI/UX.
								`}
								tags={['Опыт работы 3 -  6 лет', 'Полный день', 'Удаленная работа', 'Любой город']}
								city='Екатеринбург'
								birthday={new Date(2005, 0, 18)}
								skills={['Figma', 'Photoshop', 'Web-дизайн', 'iOS']}
								onRespond={() => setRespondedResumeId(3)} />
							<ResumeCard
								onClick={(e) => {
									if((e.target as any).tagName !== 'BUTTON' && (e.target as any).tagName !== 'svg')
										router.push(`/resumes/${3}`);
								}}
								className={getRoundedStyles(3)}
								avatar='/assets/DEV_ONLY.png'
								name='Алексей'
								surname='Шкотлыченко'
								vacancyName='Junior UX/UI дизайнер'
								minSalary={125000}
								about={`
									Плотно взаимодействовать с командой, и корректировать UI в соответствии с возможностями
									современных технологий. Контролировать реализацию UI/UX в конечном продукте.
									Что ты должен знать/уметь: Ты имеешь опыт работы в сфере мобильных IT продуктов в роли UI/UX.
								`}
								tags={['Опыт работы 3 -  6 лет', 'Полный день', 'Удаленная работа', 'Любой город']}
								city='Екатеринбург'
								birthday={new Date(2005, 0, 18)}
								skills={['Figma', 'Photoshop', 'Web-дизайн', 'iOS']}
								onRespond={() => setRespondedResumeId(4)} />
						</div>
						<PageSlider
							className='mt-10'
							currentPage={router.query && router.query.page ? +router.query.page : 1}
							maxPages={isSuccess ? data.total_pages : 1}
							onMove={(pageNumber) => {
								router.push({
									pathname: router.pathname,
									query: {
										...router.query,
										page: pageNumber,
									},
								});
							}} />
					</div>
				</div>
			</SearchLayout>
		</ModalLayout>
	);
};

export default withCheckAuthLayout(ResumesPage, {
	checkLoggined: true,
});
