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
import CloseIcon from '../../../assets/general/close.svg';

const MyVacancyPage = (): JSX.Element => {
	const router = useRouter();

	const [showContacts, setShowContacts] = useState(false);
	const [showRespondMenu, setShowRespondMenu] = useState(false);

	const { data, isSuccess } = useQuery([{ id: router.query.id }], getVacancyById, {
		enabled: !!(router && router.query),
	});

	const { title, email, phone, full_name, salary, description, job_category, experience, type_employments,
		schedules, employer, created_at, avatar, id } = data ? data.payload[0] : {} as any;

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
						<div className='flex flex-wrap gap-2 mb-4'>
							{isSuccess && [
								job_category.name, EXPERIENCE[experience], ...type_employments.map((i) => i.name),
								...schedules.map((i) => i.name)]
								.map((i, num) => (
									<span className='py-[2px] px-1 bg-softGold rounded-[4px]' key={num}>
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
							₽
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
							<div className='relative'>
								<Button
									variant='secondary'
									className='h-12 px-8'
									onClick={() => setShowContacts((prev) => !prev)}
								>
									Показать контакты
								</Button>
								{showContacts && (
									<div
										className='absolute top-18 w-[314px] bg-[#FAFBFC] p-4 rounded-xl'
										style={{
											boxShadow: `0px 80px 32px rgba(35, 47, 59, 0.01), 0px 45px 27px
											rgba(35, 47, 59, 0.03), 0px 20px 20px rgba(35, 47, 59, 0.04),
											0px 5px 11px rgba(35, 47, 59, 0.05), 0px 0px 0px rgba(35, 47, 59, 0.05)`,
										}}
									>
										<div className='flex justify-between items-center mb-4'>
											<Paragraph variant='4' tag='p' className='font-semibold'>
												{full_name}
											</Paragraph>
											<button onClick={() => setShowContacts(false)}>
												<CloseIcon className='fill-icon-secondary' />
											</button>
										</div>
										<div className='grid grid-cols-[16px_1fr] gap-x-4 gap-y-[10px] items-center'>
											<PhoneSolidIcon className='fill-darkBlue' />
											<Paragraph variant='5' tag='p' className='text-text'>
												{formatPhoneNumberIntl(phone)}
											</Paragraph>
											<MailSolidIcon className='fill-darkBlue' />
											<Paragraph variant='5' tag='p' className='text-text'>
												{email}
											</Paragraph>
										</div>
									</div>
								)}
							</div>
						</div>
						<Paragraph variant='5' tag='p' className='mb-8'>
							{description}
						</Paragraph>
						<div className='w-full border-t-[1px] border-gray-100 mb-8'></div>
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
			</SearchLayout>
		</>
	);
};

export default MyVacancyPage;
