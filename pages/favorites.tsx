import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import Headline from '../components/Headline';
import PageSlider from '../components/PageSlider';
import MainLayout from '../layouts/MainLayout';
import ContentLoader from 'react-content-loader';
import { addVacancyToFavorite, getFavoriteVacancies, removeVacancyFromFavorites } from '../shared/api/favorites';
import { EXPERIENCE } from '../shared/consts/profile';
import VacancyCard from '../components/VacancyCard';
import { slide as Menu } from 'react-burger-menu';
import RespondVacancyMenu from '../components/RespondVacancyMenu';
import { useState } from 'react';
import { respondVacancy } from '../shared/api/vacancies';
import { AxiosError } from 'axios';

const FavoritesPage = (): JSX.Element => {
	const router = useRouter();

	const [respondedVacancyId, setRespondedVacancyId] = useState(null);
	const [sendedVacancyId, setSendedVacancyId] = useState(null);

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

	const { data, isSuccess } = useQuery([{ page: router.query.page ? +router.query.page : 1 }], getFavoriteVacancies, {
		enabled: !!(router && router.query),
	});

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
		<>
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
			<MainLayout className='bg-[#FAFBFC] pt-10 px-40'>
				<Headline variant='5' tag='h1' className='font-bold mb-10'>
					Избранные вакансии
				</Headline>
				<div className='grid mb-10'>
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
							description={i.description ? i.description.replaceAll('<br>', '') : i.description}
							companyAvatar={i.employer.avatar}
							tags={[
								i.job_category.name, EXPERIENCE[i.experience], ...i.type_employments.map((i) => i.name),
								...i.schedules.map((i) => i.name), (i.city && i.city.name)]}
							contactName={i.full_name}
							contactPhone={i.phone}
							contactMail={i.email}
							onRespond={() => setRespondedVacancyId(i.id)}
							isFavorited={i.is_favorite}
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
					currentPage={router && router.query.page ? +router.query.page : 1}
					maxPages={isSuccess ? data.total_pages : 1}
					onMove={(pageNumber) => router.push('/my_vacancies', {
						query: {
							page: pageNumber,
						},
					})} />
			</MainLayout>
		</>
	);
};

export default FavoritesPage;
