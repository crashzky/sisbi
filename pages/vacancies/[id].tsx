import { useRouter } from 'next/router';
import BreadCrumbs from '../../components/BreadCrumbs';
import SearchLayout from '../../layouts/SearchLayout';
import Paragraph from '../../components/Paragraph';
import Headline from '../../components/Headline';
import Image from 'next/image';
import Button from '../../components/Button';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import RespondVacancyMenu from '../../components/RespondVacancyMenu';
import { useMutation, useQuery } from 'react-query';
import { getVacancyById, respondVacancy } from '../../shared/api/vacancies';
import { EXPERIENCE } from '../../shared/consts/profile';
import useUserType from '../../hooks/useUserType';
import { AxiosError } from 'axios';
import ContentLoader from 'react-content-loader';
import useWindowDemantions from '../../hooks/useWindowDementions';

import CompanyIcon from '../../assets/company.svg';
import PhoneSolidIcon from '../../assets/communication/phone_solid.svg';
import MailSolidIcon from '../../assets/communication/mail_solid.svg';
import CloseIcon from '../../assets/general/close.svg';

const VacancyPage = (): JSX.Element => {
	const router = useRouter();

	const { userType } = useUserType();
	const { width } = useWindowDemantions();

	const [showRespondMenu, setShowRespondMenu] = useState(false);

	const { data, isSuccess } = useQuery([{ id: router.query.id }], getVacancyById, {
		enabled: !!(router && router.query),
	});

	const respondVacancyMuttation = useMutation(respondVacancy, {
		onSuccess: () => {
			setShowRespondMenu(false);
		},
	});

	const { title, email, phone, full_name, salary, description, job_category, experience, type_employments,
		schedules, employer, created_at, avatar, city, id } = data ? data.payload : {} as any;
	
	function getErrorMessage() {
		switch((respondVacancyMuttation.error as AxiosError).response.status) {
			case 422:
				return 'Вы уже откликались на эту вакансию';
			default:
				return 'Что-то пошло не так. Попробуйте ещё раз позже';
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
				{isSuccess && (
					<RespondVacancyMenu
						className='rounded-t-3xl'
						isLoading={respondVacancyMuttation.isLoading}
						companyName={employer.name}
						vacancyName={title}
						vacancyId={id}
						minPrice={salary}
						contactName={full_name}
						contactPhone={phone}
						errorMessage={respondVacancyMuttation.isError && getErrorMessage()}
						contactMail={email}
						onContinue={(message) => {
							respondVacancyMuttation.mutate({
								response: {
									message,
									vacancy_id: id,
								},
							});
						}}
						onBack={() => setShowRespondMenu(false)} />
				)}
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
									label: 'Вакансии',
									href: {
										pathname: '/vacancies',
										query: router.query,
									},
								},
								{
									label: isSuccess ? title : '',
									href: {
										pathname: router.pathname,
										query: router.query,
									},
								},
							]} />
						<div className='flex justify-between'>
							<div className='max-w-[552px]'>
								<div className='flex flex-wrap gap-2 mb-4'>
									{isSuccess && [
										job_category.name, EXPERIENCE[experience], ...type_employments.map((i) => i.name),
										...schedules.map((i) => i.name), (city && city.name)]
										.map((i, num) => (
											<span className='py-[2px] px-1 bg-softGold rounded-[4px]' key={num}>
												{i}
											</span>
										))}
								</div>
								<div className='grid grid-flow-col gap-3 w-fit mb-5'>
									{employer && employer.avatar ? (
										<Image
											width={20}
											height={20}
											alt='Company'
											className='object-cover rounded-full'
											src={employer.avatar} />
									) : (
										<CompanyIcon />
									)}
									<Paragraph variant='4' tag='p' className='text-text'>
										{employer && employer.name}
									</Paragraph>
								</div>
								<Headline variant='3' tag='h1' className='mb-2 font-bold'>
									{isSuccess ? title : 'Загрузка...'}
								</Headline>
								<Headline variant='5' tag='p' className='mb-6 font-bold text-text'>
									от
									{' '}
									{new Intl.NumberFormat().format(salary)}
									{' '}
									<span className='font-rouble text-3xl text-text'>
										{'c'}
									</span>
								</Headline>
								<Paragraph variant='5' tag='p' className='mb-1'>
									{isSuccess && employer.name}
								</Paragraph>
								<Paragraph variant='5' tag='p' className='mb-6 text-text-secondary'>
									{isSuccess && job_category.name}
								</Paragraph>
								<div className='grid grid-flow-col gap-2 w-fit mb-8'>
									{(userType && userType=== 'user') ? (
										<Button className='h-12 px-8' onClick={() => setShowRespondMenu(true)}>
											Откликнуться
										</Button>
									) : <></>}
									<Button
										variant='secondary'
										className='h-12 px-8'
										onClick={() => router.push('#contacts')}
									>
										Показать контакты
									</Button>
								</div>
								<Paragraph variant='5' tag='p' className='mb-8'>
									{description}
								</Paragraph>
								<div className='w-full border-t-[1px] border-gray-100 mb-8' id='contacts'></div>
								<Paragraph variant='3' tag='h2' className='font-semibold mb-4'>
									Контактная информация
								</Paragraph>
								<Paragraph variant='5' tag='p' className='mb-2'>
									{full_name}
								</Paragraph>
								<div className='grid grid-flow-col w-fit gap-3 items-center'>
									<PhoneSolidIcon className='fill-darkBlue' />
									<Paragraph variant='5' tag='p' className='mr-3 text-darkBlue'>
										{formatPhoneNumberIntl(phone)}
									</Paragraph>
									<MailSolidIcon className='fill-darkBlue' />
									<Paragraph variant='5' tag='p' className='text-darkBlue'>
										{email}
									</Paragraph>
								</div>
								<Paragraph variant='5' tag='p' className='mt-10 text-text-secondary'>
									Вакансия опубликована
									{' '}
									{isSuccess && format(new Date(created_at), 'dd MMMM в HH:mm', {
										locale: ru,
									})}
								</Paragraph>
							</div>
							{avatar && (
								<div>
									<Image
										className='object-cover rounded-xl'
										src={avatar}
										width={269}
										height={269}
										alt='vacancy' />
								</div>
							)}
						</div>
					</>
				)}
			</SearchLayout>
		</>
	);
};

export default VacancyPage;
