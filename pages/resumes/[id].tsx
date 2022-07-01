import { useRouter } from 'next/router';
import BreadCrumbs from '../../components/BreadCrumbs';
import SearchLayout from '../../layouts/SearchLayout';
import Paragraph from '../../components/Paragraph';
import Headline from '../../components/Headline';
import Image from 'next/image';
import Button from '../../components/Button';
import { format, intervalToDuration, parse } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import useUserType from '../../hooks/useUserType';
import { getResumeById } from '../../shared/api/resumes';
import { useMutation, useQuery } from 'react-query';
import { EXPERIENCE } from '../../shared/consts/profile';
import ContentLoader from 'react-content-loader';
import useWindowDemantions from '../../hooks/useWindowDementions';
import { createInvite } from '../../shared/api/invites';
import { AxiosError } from 'axios';
import yearsToText from '../../utils/yearsToText';

import RespondResumeMenu from '../../components/RespondResumeMenu';

const ResumeIdPage = (): JSX.Element => {
	const router = useRouter();
	
	const { userType } = useUserType();

	const { width } = useWindowDemantions();

	const [showRespondMenu, setShowRespondMenu] = useState(false);

	const { data, isSuccess } = useQuery([{ id: router.query.id }], getResumeById, {
		enabled: !!(router && router.query),
	});

	const inviteMutation = useMutation(createInvite, {
		onSuccess: () => setShowRespondMenu(false),
	});

	const { first_name, surname, job_category, experience, type_employments, schedules,
		city, birthday, previous_job, about, min_salary, skills, created_at, id, avatar } = data ? data.payload : {} as any;

	const interval = intervalToDuration({
		start: birthday ? parse(birthday, 'dd.MM.yyyy', new Date()) : new Date(Date.now()),
		end: new Date(Date.now()),
	});	

	function getErrorMessage() {
		if(inviteMutation.isError) {
			switch((inviteMutation.error as AxiosError).response.status) {
				case 422:
					return 'Вы уже отправляли приглашение на это резюме';
				default:
					return 'Что-то пошло не так. Попробуйте ещё раз позже';
			}
		}
	}

	return (
		<>
			<Menu
				right
				isOpen={showRespondMenu}
				burgerButtonClassName='hidden'
				onClose={() => setShowRespondMenu(false)}
				width={457}
			>
				<RespondResumeMenu
					className='rounded-t-3xl'
					resumeId={id}
					isLoading={inviteMutation.isLoading}
					errorMessage={getErrorMessage()}
					name={first_name}
					surname={surname}
					vacancyName={previous_job}
					minPrice={min_salary}
					onContinue={(message, isAllowed, vacancyId) => {
						inviteMutation.mutate({
							invite: {
								message,
								user_id: id,
								vacancy_id: vacancyId,
							},
						});
					}}
					onBack={() => setShowRespondMenu(false)} />
			</Menu>
			<SearchLayout className='px-40 py-10'>
				{!isSuccess ? (
					<ContentLoader
						height={600}
						width={width / 1.3}
						className='mt-5'
						viewBox='0 0 450 300'
						backgroundColor='#f5f5f5'
						foregroundColor='#dbdbdb'
					>
						<circle cx='75' cy='75' r='70' />
						<rect x='160' y='15' rx='3' ry='3' width='50' height='15' />
						<rect x='215' y='15' rx='3' ry='3' width='50' height='15' />
						<rect x='270' y='15' rx='3' ry='3' width='50' height='15' />
						<rect x='325' y='15' rx='3' ry='3' width='50' height='15' />
				
						<rect x='160' y='35' rx='3' ry='3' width='290' height='1' />
				
						<rect x='160' y='45' rx='3' ry='3' width='35' height='8' />
						<rect x='380' y='45' rx='3' ry='3' width='70' height='8' />
				
						<rect x='160' y='60' rx='3' ry='3' width='140' height='50' />
						<rect x='310' y='60' rx='3' ry='3' width='140' height='50' />
						<rect x='160' y='120' rx='3' ry='3' width='140' height='50' />
						<rect x='310' y='120' rx='3' ry='3' width='140' height='50' />
						<rect x='160' y='180' rx='3' ry='3' width='140' height='50' />
						<rect x='310' y='180' rx='3' ry='3' width='140' height='50' />
				
						<rect x='5' y='150' rx='3' ry='3' width='130' height='15' />
						<rect x='5' y='170' rx='3' ry='3' width='70' height='10' />
						<rect x='10' y='190' rx='3' ry='3' width='115' height='15' />
						<rect x='10' y='210' rx='3' ry='3' width='35' height='8' />
						<rect x='50' y='210' rx='3' ry='3' width='35' height='8' />
						<rect x='90' y='210' rx='3' ry='3' width='35' height='8' />
					</ContentLoader>
				) : (
					<>
						<BreadCrumbs
							className='mb-10'
							items={[
								{
									label: 'Резюме',
									href: {
										pathname: '/resumes',
										query: router.query,
									},
								},
								{
									label: `${first_name} ${surname}`,
									href: {
										pathname: router.pathname,
										query: router.query,
									},
								},
							]} />
						<div className='flex justify-between'>
							<div className='max-w-[552px]'>
								<div className='flex flex-wrap mb-4'>
									{isSuccess && [
										(job_category && job_category.name), EXPERIENCE[experience],
										...type_employments.map((i) => i.name), ...schedules.map((i) => i.name)]
										.filter((i) => !!i).map((i, num) => (
											<span className='py-[2px] px-1 m-1 bg-softGold rounded-[4px]' key={num}>
												{i}
											</span>
										))}
								</div>
								<Paragraph variant='4' tag='p' className='text-text mb-5'>
									{`${first_name} ${surname}, ${interval.years ? `${interval.years} 
									${yearsToText(interval.years)}, ` : ''}`}
									{' '}
									{city ? city.name : ''}
								</Paragraph>
								<Headline variant='3' tag='h1' className='mb-2 font-bold'>
									{previous_job}
								</Headline>
								<Headline variant='5' tag='p' className='mb-6 font-bold text-text'>
									от
									{' '}
									{new Intl.NumberFormat().format(+min_salary)}
									{' '}
									<span className='font-rouble text-3xl text-text'>
										{'c'}
									</span>
								</Headline>
								<Paragraph variant='5' tag='p' className='mb-6 text-text-secondary'>
									Навыки:
									{' '}
									{isSuccess && skills.split(' ').join(', ')}
								</Paragraph>
								{(userType && userType === 'employer') && (
									<Button className='h-12 px-8 mb-8' onClick={() => setShowRespondMenu(true)}>
										Отправить приглашение
									</Button>
								)}
								{about && about.split('<br>').map((i, num) => {
									if(num != about.split('<br>').length - 1) {
										return (
											<Paragraph key={num} variant='5' tag='p'>
												{i}
												<br />
											</Paragraph>
										);
									}
									else {
										return (
											<Paragraph key={num} variant='5' tag='p' className='mb-8'>
												{i}
											</Paragraph>
										);
									}
								})}
								<div className='w-full border-t-[1px] border-gray-100 mb-8'></div>
								<Paragraph variant='3' tag='h2' className='font-semibold mb-6'>
									Профессиональные навыки
								</Paragraph>
								<div className='flex flex-wrap gap-2 mb-4'>
									{isSuccess && skills.split(' ').map((i, num) => (
										<span className='py-[2px] px-1 bg-softGold rounded-[4px]' key={num}>
											{i}
										</span>
									))}
								</div>
								<Paragraph variant='5' tag='p' className='mt-10 text-text-secondary'>
									Резюме опубликовано
									{' '}
									{isSuccess && format(new Date(created_at), 'dd MMMM в HH:mm', {
										locale: ru,
									})}
								</Paragraph>
							</div>
							<div>
								{avatar && (
									<Image
										className='object-cover rounded-xl'
										src={avatar}
										width={269}
										height={269}
										alt='resume' />
								)}
							</div>
						</div>	
					</>
				)}
			</SearchLayout>
		</>
	);
};

export default ResumeIdPage;
