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
import { getVacancies, respondVacancy } from '../../shared/api/vacancies';
import withRouterParam from '../../utils/withRouterParam';
import { EXPERIENCE } from '../../shared/consts/profile';
import ContentLoader from 'react-content-loader';
import { AxiosError } from 'axios';

import SelectJobModal from '../../modals/SelectJobModal';
import { addVacancyToFavorite, removeVacancyFromFavorites } from '../../shared/api/favorites';
import useUserType from '../../hooks/useUserType';
import Button from '../../components/Button';

const VacanciesPage = (): JSX.Element => {
	const router = useRouter();

	const [respondedVacancyId, setRespondedVacancyId] = useState(null);
	const [sendedVacancyId, setSendedVacancyId] = useState(null);

	const { userType } = useUserType();

	const { activeModal } = useModal(['job_categories']);

	const { data, mutate, isSuccess } = useMutation(getVacancies);

	const respondMutation = useMutation(respondVacancy, {
		onMutate: () => {
			setSendedVacancyId(respondedVacancyId);
		},
		onSuccess: () => {
			setRespondedVacancyId(null);
		},
	});

	const addToFavoritesMutation = useMutation(addVacancyToFavorite);
	const removeFromFavoritesMutation = useMutation(removeVacancyFromFavorites);

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

	function getErrorMessage() {
		if(respondMutation.isError && sendedVacancyId === respondedVacancyId) {
			switch((respondMutation.error as AxiosError).response.status) {
				case 422:
					return 'Вы уже откликались на эту вакансию';
				default:
					return 'Что-то пошло не так. Попробуйте ещё раз позже';
			}
		}
	}

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
						companyAvatar={respondedVacancy.employer.avatar}
						vacancyName={respondedVacancy.title}
						vacancyId={respondedVacancyId}
						isLoading={respondMutation.isLoading}
						minPrice={respondedVacancy.salary}
						contactName={respondedVacancy.full_name}
						contactPhone={respondedVacancy.phone}
						contactMail={respondedVacancy.email}
						errorMessage={getErrorMessage()}
						onContinue={(message) => {
							respondMutation.mutate({
								response: {
									vacancy_id: respondedVacancyId,
									message,
								},
							});
						}}
						onBack={() => setRespondedVacancyId(null)} />
				)}
			</Menu>
			<SearchLayout className='px-40'>
				<div className='flex justify-between items-center'>
					<Headline variant='5' tag='h1' className='py-10 font-bold'>
						Найдено
						{` ${data && data.total_entries ? data.total_entries : 0} `}
						вакансий
					</Headline>
					{userType === 'employer' && (
						<Button variant='primary' className='h-10 px-4' onClick={() => router.push('/my_vacancies/new')}>
							Добавить вакансию
						</Button>
					)}
				</div>
				<div className='grid grid-cols-[216px_1fr] gap-[68px]'>
					<VacanciesFiltres
						variant='vacancies'
						style={{
							gap: activeModal && '0px',
						}} />
					<div >
						<div className='grid'>
							{isSuccess ? data.payload.map((i, num) => (
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
										...i.schedules.map((i) => i.name), (i.city && i.city.name)]}
									contactName={i.full_name}
									contactPhone={i.phone}
									contactMail={i.email}
									isFavorited={i.is_favorite}
									onRespond={() => setRespondedVacancyId(i.id)}
									onAddToFavorites={() => addToFavoritesMutation.mutate({ vacancy_id: i.id })}
									onRemoveFromFavorited={() => {
										removeFromFavoritesMutation.mutate({ favorite_vacancy_id: i.id });
									}} />
							)) : (
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
							)}
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
