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
import withRouterParam from '../../utils/withRouterParam';
import SelectJobModal from '../../modals/SelectJobModal';
import ResumeCard from '../../components/ResumeCard';
import RespondResumeMenu from '../../components/RespondResumeMenu';
import { getResumes } from '../../shared/api/resumes';
import { EXPERIENCE } from '../../shared/consts/profile';
import ContentLoader from 'react-content-loader';
import { parse } from 'date-fns';

const ResumesPage = (): JSX.Element => {
	const router = useRouter();

	const [respondedResumeId, setRespondedResumeId] = useState(null);

	const { activeModal } = useModal(['job_categories']);

	const { data, mutate, isSuccess, isLoading } = useMutation(getResumes);

	useEffect(() => {
		mutate({
			...withRouterParam(router, 'page', 'number'),
			...withRouterParam(router, 'query'),
			...withRouterParam(router, 'city', 'number'),
			...withRouterParam(router, 'gender'),
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
		if(current === data.payload.length - 1)
			className.push('rounded-b-3xl');
		if(current % 2 !== 0 && current !== data.payload.length - 1)
			className.push('border-y-0');
		else if(current === data.payload.length - 1 && current % 2 !== 0)
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
				{respondedResume && (
					<RespondResumeMenu
						className='rounded-t-3xl'
						name={respondedResume.first_name}
						surname={respondedResume.surname}
						vacancyName={respondedResume.previous_job}
						minPrice={respondedResume.min_salary}
						resumeId={respondedResume.id}
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
							{isLoading || !data ? (
								<ContentLoader
									width='100%'
									height={300}
									viewBox='0 0 700 300'
									backgroundColor='#f5f5f5'
									foregroundColor='#dbdbdb'
								>
									<rect x='4' y='8' rx='3' ry='3' width='7' height='288' />
									<rect x='6' y='289' rx='3' ry='3' width='669' height='8' />
									<rect x='670' y='9' rx='3' ry='3' width='6' height='285' />
									<rect x='55' y='42' rx='16' ry='16' width='274' height='216' />
									<rect x='412' y='113' rx='3' ry='3' width='102' height='7' />
									<rect x='402' y='91' rx='3' ry='3' width='178' height='6' />
									<rect x='405' y='139' rx='3' ry='3' width='178' height='6' />
									<rect x='416' y='162' rx='3' ry='3' width='102' height='7' />
									<rect x='405' y='189' rx='3' ry='3' width='178' height='6' />
									<rect x='5' y='8' rx='3' ry='3' width='669' height='7' />
									<rect x='406' y='223' rx='14' ry='14' width='72' height='32' />
									<rect x='505' y='224' rx='14' ry='14' width='72' height='32' />
									<rect x='376' y='41' rx='3' ry='3' width='231' height='29' />
								</ContentLoader>
							) : data.payload.map((i, num) => (
								<ResumeCard
									key={num}
									onClick={(e) => {
										if((e.target as any).tagName !== 'BUTTON' && (e.target as any).tagName !== 'svg')
											router.push(`/resumes/${i.id}`);
									}}
									className={getRoundedStyles(num)}
									avatar={i.avatar}
									name={i.first_name}
									surname={i.surname}
									vacancyName={i.previous_job}
									minSalary={i.min_salary}
									about={i.about}
									tags={[
										(i.job_category && i.job_category.name), EXPERIENCE[i.experience],
										...i.type_employments.map((j) => j.name), ...i.schedules.map((j) => j.name),
										(i.city && i.city.name),
									].filter((i) => !!i)}
									city={i.city ? i.city.name : ''}
									birthday={parse(i.birthday, 'dd.MM.yyyy', new Date())}
									skills={i.skills.split(' ')}
									onRespond={() => setRespondedResumeId(i.id)} />
							))}
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
