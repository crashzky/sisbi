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
import withCheckAuthLayout from '../layouts/CheckAuthLayout';
import useUserType from '../hooks/useUserType';
import { addUserToFavorite, getFavoriteUsers, removeUserFromFavorites } from '../shared/api/favorite_users';
import { IVacancy } from '../shared/types/api/vacancies';
import { IUser } from '../shared/types/api/user';
import { createInvite } from '../shared/api/invites';
import RespondResumeMenu from '../components/RespondResumeMenu';
import ResumeCard from '../components/ResumeCard';
import { parse } from 'date-fns';

const FavoritesPage = (): JSX.Element => {
	const router = useRouter();

	const { userType } = useUserType();

	const [respondedId, setRespondedId] = useState(null);
	const [sendedId, setSendedId] = useState(null);

	const respondMutation = useMutation(respondVacancy, {
		onMutate: () => {
			setSendedId(respondedId);
		},
		onSuccess: () => {
			setRespondedId(null);
		},
	});

	const inviteMutation = useMutation(createInvite, {
		onMutate: () => {
			setSendedId(respondedId);
		},
		onSuccess: () => {
			setRespondedId(null);
		},
	});

	const addVacancyToFavoritesMutation = useMutation(addVacancyToFavorite);
	const removeVacancyFromFavoritesMutation = useMutation(removeVacancyFromFavorites);

	const addUserToFavoritesMutation = useMutation(addUserToFavorite);
	const removeUserFromFavoritesMutation = useMutation(removeUserFromFavorites);

	const favoriteVacancies = useQuery([{ page: router.query.page ? +router.query.page : 1 }], getFavoriteVacancies, {
		enabled: !!(router && router.query) && userType === 'user',
	});

	const favoriteUsers = useQuery([{ page: router.query.page ? +router.query.page : 1 }], getFavoriteUsers, {
		enabled: !!(router && router.query) && userType === 'employer',
	});

	const data = userType === 'user' ? favoriteVacancies.data : favoriteUsers.data;
	const isSuccess = userType === 'user' ? favoriteVacancies.isSuccess : favoriteUsers.isSuccess;

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

	const respondedVacancy = respondedId && userType === 'user'
		? (data.payload as IVacancy[]).find((i) => i.id === respondedId)
		: null;

	function getErrorMessageVacancy() {
		if(respondMutation.isError && sendedId === respondedId) {
			switch((respondMutation.error as AxiosError).response.status) {
				case 422:
					return 'Вы уже откликались на эту вакансию';
				default:
					return 'Что-то пошло не так. Попробуйте ещё раз позже';
			}
		}
	}

	const respondedResume = respondedId && userType === 'employer'
		? (data.payload as IUser[]).find((i) => i.id === respondedId)
		: null;

	function getErrorMessageResume() {
		if(respondMutation.isError && sendedId === respondedId) {
			switch((respondMutation.error as AxiosError).response.status) {
				case 422:
					return 'Вы уже откликались на это резюме';
				default:
					return 'Что-то пошло не так. Попробуйте ещё раз позже';
			}
		}
	}

	return (
		<>
			<Menu
				right
				isOpen={!!respondedId}
				burgerButtonClassName='hidden'
				onClose={() => setRespondedId(null)}
				width={457}
			>
				{respondedVacancy && (
					<RespondVacancyMenu
						className='rounded-t-3xl'
						companyName={respondedVacancy.employer.name}
						companyAvatar={respondedVacancy.employer.avatar}
						vacancyName={respondedVacancy.title}
						vacancyId={respondedId}
						isLoading={respondMutation.isLoading}
						minPrice={respondedVacancy.salary}
						contactName={respondedVacancy.full_name}
						contactPhone={respondedVacancy.phone}
						contactMail={respondedVacancy.email}
						errorMessage={getErrorMessageVacancy()}
						onContinue={(message) => {
							respondMutation.mutate({
								response: {
									vacancy_id: respondedId,
									message,
								},
							});
						}}
						onBack={() => setRespondedId(null)} />
				)}

				{respondedResume && (
					<RespondResumeMenu
						className='rounded-t-3xl'
						isLoading={inviteMutation.isLoading}
						errorMessage={getErrorMessageResume()}
						name={respondedResume.first_name}
						surname={respondedResume.surname}
						vacancyName={respondedResume.previous_job}
						minPrice={respondedResume.min_salary}
						resumeId={respondedResume.id}
						onContinue={(message, isAllowed, vacancyId) => {
							setSendedId(respondedId);

							inviteMutation.mutate({
								invite: {
									user_id: respondedId,
									vacancy_id: vacancyId,
									message,
								},
							});
						}}
						onBack={() => setRespondedId(null)} />
				)}
			</Menu>
			<MainLayout className='bg-[#FAFBFC] pt-10 px-40'>
				<Headline variant='5' tag='h1' className='font-bold mb-10'>
					{userType === 'user' ? 'Избранные вакансии' : 'Избранные резюме'}
				</Headline>
				<div className='grid mb-10'>
					{!isSuccess && (
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
					{(data && userType === 'user') && (data.payload as IVacancy[]).map((i, num) => (
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
							onRespond={() => setRespondedId(i.id)}
							isFavorited={i.is_favorite}
							onAddToFavorites={() => addVacancyToFavoritesMutation.mutate({ vacancy_id: i.id })}
							onRemoveFromFavorited={() => {
								removeVacancyFromFavoritesMutation.mutate({ favorite_vacancy_id: i.id });
							}} />
					))}
					{(data && userType === 'employer') && (data.payload as IUser[]).map((i, num) => (
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
							isFavorited={i.is_favorite}
							tags={[
								(i.job_category && i.job_category.name), EXPERIENCE[i.experience],
								...i.type_employments.map((j) => j.name), ...i.schedules.map((j) => j.name),
								(i.city && i.city.name),
							].filter((i) => !!i)}
							city={i.city ? i.city.name : ''}
							birthday={parse(i.birthday, 'dd.MM.yyyy', new Date())}
							skills={i.skills ? i.skills.split(' ') : []}
							onRespond={() => setRespondedId(i.id)}
							onAddToFavorites={() => addUserToFavoritesMutation.mutate({ user_id: i.id })}
							onRemoveFromFavorited={() => {
								removeUserFromFavoritesMutation.mutate({ favorite_user_id: i.id });
							}} />
					))}
				</div>
				<PageSlider
					currentPage={router && router.query.page ? +router.query.page : 1}
					maxPages={isSuccess ? data.total_pages : 1}
					onMove={(pageNumber) => router.push('/favorites', {
						query: {
							page: pageNumber,
						},
					})} />
			</MainLayout>
		</>
	);
};

export default withCheckAuthLayout(FavoritesPage, {
	checkLoggined: true,
});
