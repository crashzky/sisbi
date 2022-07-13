import { useRouter } from 'next/router';
import BreadCrumbs from '../../../components/BreadCrumbs';
import SearchLayout from '../../../layouts/SearchLayout';
import Paragraph from '../../../components/Paragraph';
import Headline from '../../../components/Headline';
import Image from 'next/image';
import Button from '../../../components/Button';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import RespondVacancyMenu from '../../../components/RespondVacancyMenu';
import { useQuery } from 'react-query';
import { getVacancyById } from '../../../shared/api/vacancies';
import { EXPERIENCE } from '../../../shared/consts/profile';

import CompanyIcon from '../../../assets/company.svg';
import PhoneSolidIcon from '../../../assets/communication/phone_solid.svg';
import MailSolidIcon from '../../../assets/communication/mail_solid.svg';

const MyVacancyPage = (): JSX.Element => {
	const router = useRouter();

	const [showRespondMenu, setShowRespondMenu] = useState(false);

	const { data, isSuccess } = useQuery([{ id: router.query.id }], getVacancyById, {
		enabled: !!(router && router.query),
	});

	const { title, email, phone, full_name, salary, description, job_category, experience, type_employments,
		schedules, employer, created_at, avatar, city, id } = data ? data.payload : {} as any;

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
						companyName={employer.name}
						vacancyName={title}
						vacancyId={id}
						minPrice={salary}
						contactName={full_name}
						contactPhone={phone}
						contactMail={email}
						onContinue={() => setShowRespondMenu(false)}
						onBack={() => setShowRespondMenu(false)} />
				)}
			</Menu>
			<SearchLayout className='px-40 py-10'>
				<BreadCrumbs
					className='mb-10'
					items={[
						{
							label: 'Мои вакансии',
							href: {
								pathname: '/my_vacancies',
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
						<div className='flex flex-wrap mb-4'>
							{isSuccess && [
								job_category.name, EXPERIENCE[experience], ...type_employments.map((i) => i.name),
								...schedules.map((i) => i.name), city.name]
								.map((i, num) => (
									<span className='py-[2px] px-1 m-1 bg-softGold rounded-[4px]' key={num}>
										{i}
									</span>
								))}
						</div>
						<div className='grid grid-flow-col gap-3 w-fit mb-5'>
							<CompanyIcon />
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
							<Button className='h-12 px-8' onClick={() => setShowRespondMenu(true)}>
								Откликнуться
							</Button>
							<Button
								variant='secondary'
								className='h-12 px-8'
								onClick={() => router.push('#contacts')}
							>
								Показать контакты
							</Button>
						</div>
						{(data && description) && description.split('\n').map((i, num) => {
							if(num != description.split('\n').length - 1) {
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
						<Paragraph variant='3' tag='h2' className='font-semibold mb-4'>
							Контактная информация
						</Paragraph>
						<Paragraph variant='5' tag='p' className='mb-2'>
							{full_name}
						</Paragraph>
						<div className='grid grid-flow-col w-fit gap-3 items-center' id='contacts'>
							<PhoneSolidIcon className='fill-darkBlue' />
							<Paragraph variant='5' tag='p' className='mr-3 text-darkBlue'>
								<a href={`tel:${phone}`}>
									{formatPhoneNumberIntl(phone)}
								</a>
							</Paragraph>
							<MailSolidIcon className='fill-darkBlue' />
							<Paragraph variant='5' tag='p' className='text-darkBlue'>
								<a href={`mailto:${email}`}>
									{email}
								</a>
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
			</SearchLayout>
		</>
	);
};

export default MyVacancyPage;
