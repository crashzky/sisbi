import { useRouter } from 'next/router';
import Headline from '../../components/Headline';
import VacancyCard from '../../components/VacancyCard';
import ModalLayout from '../../layouts/ModalLayout';
import SearchLayout from '../../layouts/SearchLayout';
import VacanciesFiltres from '../../layouts/VacanciesFiltres';
import useModal from '../../hooks/useModal';
import { slide as Menu } from 'react-burger-menu';
import { useEffect, useState } from 'react';
import RespondVacancyMenu from '../../components/RespondVacancyMenu';
import withCheckAuthLayout from '../../layouts/CheckAuthLayout';
import PageSlider from '../../components/PageSlider';
import { useMutation } from 'react-query';
import { getVacancies } from '../../shared/api/vacancies';
import withRouterParam from '../../utils/withRouterParam';
import { EXPERIENCE } from '../../shared/consts/profile';

import SelectJobModal from '../../modals/SelectJobModal';

const VacanciesPage = (): JSX.Element => {
	const router = useRouter();

	const [respondedVacancyId, setRespondedVacancyId] = useState(null);

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
		if(current === data.payload.length - 1)
			className.push('rounded-b-3xl');
		if(current % 2 !== 0 && current !== data.payload.length - 1)
			className.push('border-y-0');
		else if(current === data.payload.length - 1 && current % 2 !== 0)
			className.push('border-t-0');

		return className.join(' ');
	}

	const respondedVacancy = respondedVacancyId ? data.payload.find((i) => i.id === respondedVacancyId) : null;

	return (
		<ModalLayout modals={{
			'job_categories': <SelectJobModal />,
		}}
		>
			<Menu
				right
				isOpen={!!respondedVacancyId}
				burgerButtonClassName='hidden'
				onClose={() => setRespondedVacancyId(null)}
				width={457}
			>
				{respondedVacancy && (
					<RespondVacancyMenu
						className='rounded-t-3xl'
						companyName={respondedVacancy.employer.name}
						vacancyName={respondedVacancy.title}
						vacancyId={respondedVacancyId}
						minPrice={respondedVacancy.salary}
						contactName={respondedVacancy.full_name}
						contactPhone={respondedVacancy.phone}
						contactMail={respondedVacancy.email}
						onContinue={() => setRespondedVacancyId(null)}
						onBack={() => setRespondedVacancyId(null)} />
				)}
			</Menu>
			<SearchLayout className='px-40'>
				<Headline variant='5' tag='h1' className='py-10 font-bold'>
					Найдено
					{` ${data && data.total_entries ? data.total_entries : 0} `}
					вакансий
				</Headline>
				<div className='grid grid-cols-[216px_1fr] gap-[68px]'>
					<VacanciesFiltres
						variant='vacancies'
						style={{
							gap: activeModal && '0px',
						}} />
					<div >
						<div className='grid'>
							{isSuccess && data.payload.map((i, num) => (
								<VacancyCard
									key={num}
									onClick={(e) => {
										if((e.target as any).tagName !== 'BUTTON' && (e.target as any).tagName !== 'svg')
											router.push(`/vacancies/${i.id}`);
									}}
									className={getRoundedStyles(num)}
									imageSrc={i.avatar}
									companyName={i.employer.name}
									label={i.title}
									minPrice={i.salary}
									description={i.description}
									companyAvatar={i.employer.avatar}
									tags={[
										i.job_category.name, EXPERIENCE[i.experience], ...i.type_employments.map((i) => i.name),
										...i.schedules.map((i) => i.name), i.city.name]}
									contactName={i.full_name}
									contactPhone={i.phone}
									contactMail={i.email}
									onRespond={() => setRespondedVacancyId(1)} />
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

export default withCheckAuthLayout(VacanciesPage, {
	checkLoggined: true,
});
