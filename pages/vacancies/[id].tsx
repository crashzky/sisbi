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

import CompanyIcon from '../../assets/company.svg';
import PhoneSolidIcon from '../../assets/communication/phone_solid.svg';
import MailSolidIcon from '../../assets/communication/mail_solid.svg';
import CloseIcon from '../../assets/general/close.svg';
import RespondVacancyMenu from '../../components/RespondVacancyMenu';

const VacancyPage = (): JSX.Element => {
	const router = useRouter();

	const [showContacts, setShowContacts] = useState(false);
	const [showRespondMenu, setShowRespondMenu] = useState(false);

	return (
		<>
			<Menu
				right
				isOpen={showRespondMenu}
				burgerButtonClassName='hidden'
				onClose={() => setShowRespondMenu(false)}
				width={457}
			>
				<RespondVacancyMenu
					className='rounded-t-3xl'
					companyName='Jungu Digital'
					vacancyName='UI/UX дизайнер'
					vacancyId={1}
					minPrice={125000}
					contactName='Мария Соколова'
					contactPhone={9139822927}
					contactMail='mail@mail.ru'
					onContinue={() => setShowRespondMenu(false)}
					onBack={() => setShowRespondMenu(false)} />
			</Menu>
			<SearchLayout className='px-40 py-10'>
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
							label: 'UI/UX дизайнер',
							href: {
								pathname: router.pathname,
								query: router.query,
							},
						},
					]} />
				<div className='flex justify-between'>
					<div className='max-w-[552px]'>
						<div className='flex flex-wrap gap-2 mb-4'>
							{['Опыт от 3 лет', 'Полный день', 'Удалённая работа', 'Любой город'].map((i, num) => (
								<span className='py-[2px] px-1 bg-softGold rounded-[4px]' key={num}>
									{i}
								</span>
							))}
						</div>
						<div className='grid grid-flow-col gap-3 w-fit mb-5'>
							<CompanyIcon />
							<Paragraph variant='4' tag='p' className='text-text'>
								Jingu Digital
							</Paragraph>
						</div>
						<Headline variant='3' tag='h1' className='mb-2 font-bold'>
							UI/UX дизайнер
						</Headline>
						<Headline variant='5' tag='p' className='mb-6 font-bold text-text'>
							от 125 000 ₽
						</Headline>
						<Paragraph variant='5' tag='p' className='mb-1'>
							Jingu Digital
						</Paragraph>
						<Paragraph variant='5' tag='p' className='mb-6 text-text-secondary'>
							Искусство, развлечения, масс-медиа
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
												Мария Соколова
											</Paragraph>
											<button onClick={() => setShowContacts(false)}>
												<CloseIcon className='fill-icon-secondary' />
											</button>
										</div>
										<div className='grid grid-cols-[16px_1fr] gap-x-4 gap-y-[10px] items-center'>
											<PhoneSolidIcon className='fill-darkBlue' />
											<Paragraph variant='5' tag='p' className='text-text'>
												{formatPhoneNumberIntl('+79221734745')}
											</Paragraph>
											<MailSolidIcon className='fill-darkBlue' />
											<Paragraph variant='5' tag='p' className='text-text'>
												mail@mail.ru
											</Paragraph>
										</div>
									</div>
								)}
							</div>
						</div>
						<Paragraph variant='5' tag='p' className='mb-8'>
							«Делать то, что любишь – это свобода! Любить то, что делаешь – это счастье!»
							Нам интересна наша работа, мы любим, то что создаем!
							У нас высокие требования, высокий темп и высокие стандарты качества!!!
							Если у вас есть желание вместе с нами создавать новое и полезное для людей,
							тогда приходите и побеждайте в конкурсе и станьте частью команды «Бахетле»!
							<br />
							<br />
							Нам нужен Фотограф - Дизайнер, который вдохновлен нашей идеей и готов вместе
							с нами продвигать идеи, развивать и усиливать Бахетле!
							<br />
							<br />
							Если Вам повезет, и Вы будете работать с нами, Вашей основной задачей будет - создание
							таких рекламных материалов (макетов, буклетов, иллюстраций, каталогов , бренд-буков и тд) ,
							которые будут олицетворять и продвигать идеи Супермаркета Домашней Еды «Бахетле» и Чудо-магазина
							русской кухни Добрянка, чтобы каждый гость пришел к нам и купил свежую и вкусную продукцию
							собственного производства
							<br />
							<br />
							Нам нужен фотограф - дизайнер, который является профессионалом в сфере фуд-съемки, у
							которого есть чувство стиля и вкуса,
							Нам нужен фотограф - дизайнер, у которого на одно задание есть несколько решений,
							каждое из которых лучше другого
						</Paragraph>
						<div className='w-full border-t-[1px] border-gray-100 mb-8'></div>
						<Paragraph variant='3' tag='h2' className='font-semibold mb-4'>
							Контактная информация
						</Paragraph>
						<Paragraph variant='5' tag='p' className='mb-2'>
							Мария Соколова
						</Paragraph>
						<div className='grid grid-flow-col w-fit gap-3 items-center'>
							<PhoneSolidIcon className='fill-darkBlue' />
							<Paragraph variant='5' tag='p' className='mr-3 text-darkBlue'>
								{formatPhoneNumberIntl('+79221734745')}
							</Paragraph>
							<MailSolidIcon className='fill-darkBlue' />
							<Paragraph variant='5' tag='p' className='text-darkBlue'>
								mail@mail.ru
							</Paragraph>
						</div>
						<Paragraph variant='5' tag='p' className='mt-10 text-text-secondary'>
							Вакансия опубликована
							{' '}
							{format(new Date(Date.now()), 'dd MMMM в HH:mm', {
								locale: ru,
							})}
						</Paragraph>
					</div>
					<div>
						<Image
							className='object-cover rounded-xl'
							src='/assets/DEV_ONLY.png'
							width={269}
							height={269}
							alt='vacancy' />
					</div>
				</div>
			</SearchLayout>
		</>
	);
};

export default VacancyPage;
