import { useRouter } from 'next/router';
import BreadCrumbs from '../../components/BreadCrumbs';
import SearchLayout from '../../layouts/SearchLayout';
import Paragraph from '../../components/Paragraph';
import Headline from '../../components/Headline';
import Image from 'next/image';
import Button from '../../components/Button';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';

import RespondResumeMenu from '../../components/RespondResumeMenu';
import useUserType from '../../hooks/useUserType';

const ResumeIdPage = (): JSX.Element => {
	const router = useRouter();
	
	const { userType } = useUserType();

	const [showRespondMenu, setShowRespondMenu] = useState(false);

	/*const { data, isSuccess } = useQuery([{ id: router.query.id }], getVacancyById, {
		enabled: !!(router && router.query),
	});

	const { title, email, phone, full_name, salary, description, job_category, experience, type_employments,
		schedules, employer, created_at, avatar, id } = data ? data.payload[0] : {} as any;*/

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
					resumeId={1}
					name='Алексей'
					surname='Сухоров'
					vacancyName='Junior UI/UX дизайнер'
					minPrice={125000}
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
							label: 'Алексей Сухоров',
							href: {
								pathname: router.pathname,
								query: router.query,
							},
						},
					]} />
				<div className='flex justify-between'>
					<div className='max-w-[552px]'>
						<div className='flex flex-wrap gap-2 mb-4'>
							{/*isSuccess && [
								job_category.name, EXPERIENCE[experience], ...type_employments.map((i) => i.name),
								...schedules.map((i) => i.name)]
								.map((i, num) => (
									<span className='py-[2px] px-1 bg-softGold rounded-[4px]' key={num}>
										{i}
									</span>
								))*/}
							{['Опыт от 3 лет', 'Полный день', 'Удаленная работа', 'Любой город'].map((i, num) => (
								<span className='py-[2px] px-1 bg-softGold rounded-[4px]' key={num}>
									{i}
								</span>
							))}
						</div>
						<Paragraph variant='4' tag='p' className='text-text mb-5'>
							Алексей Сухоруков, 29 лет, Новосибирск
						</Paragraph>
						<Headline variant='3' tag='h1' className='mb-2 font-bold'>
							Junior UI/UX дизайнер
						</Headline>
						<Headline variant='5' tag='p' className='mb-6 font-bold text-text'>
							от
							{' '}
							{new Intl.NumberFormat().format(125000)}
							{' '}
							<span className='font-rouble text-3xl text-text'>
								{'c'}
							</span>
						</Headline>
						<Paragraph variant='5' tag='p' className='mb-6 text-text-secondary'>
							Навыки:
							{' '}
							{['Figma', 'Photoshop', 'Web-дизайн', 'iOS'].join(', ')}
						</Paragraph>
						{(userType && userType === 'employer') && (
							<Button className='h-12 px-8 mb-8' onClick={() => setShowRespondMenu(true)}>
								Отправить приглашение
							</Button>
						)}
						<Paragraph variant='5' tag='p' className='mb-8'>
							«Делать то, что любишь – это свобода! Любить то, что делаешь – это счастье!»
							Нам интересна наша работа, мы любим, то что создаем!
							У нас высокие требования, высокий темп и высокие стандарты качества!!!
							Если у вас есть желание вместе с нами создавать новое и полезное для людей,
							тогда приходите и побеждайте в конкурсе и станьте частью команды «Бахетле»!
							Нам нужен Фотограф - Дизайнер, который вдохновлен нашей идеей и готов вместе с
							нами продвигать идеи, развивать и усиливать Бахетле!
							Если Вам повезет, и Вы будете работать с нами, Вашей основной задачей будет -
							создание таких рекламных материалов (макетов, буклетов, иллюстраций, каталогов , бренд-буков и тд)
							, которые будут олицетворять и продвигать идеи Супермаркета Домашней Еды «Бахетле» и Чудо-магазина
							русской кухни Добрянка, чтобы каждый гость пришел к нам и купил свежую и вкусную продукцию
							собственного производства Нам нужен фотограф - дизайнер, который является профессионалом
							в сфере фуд-съемки, у которого есть чувство стиля и вкуса,
							Нам нужен фотограф - дизайнер, у которого на одно задание есть несколько решений,
							каждое из которых лучше другого
						</Paragraph>
						<div className='w-full border-t-[1px] border-gray-100 mb-8'></div>
						<Paragraph variant='3' tag='h2' className='font-semibold mb-6'>
							Профессиональные навыки
						</Paragraph>
						<div className='flex flex-wrap gap-2 mb-4'>
							{['Figma', 'Photoshop', 'Web-дизайн', 'iOS'].map((i, num) => (
								<span className='py-[2px] px-1 bg-softGold rounded-[4px]' key={num}>
									{i}
								</span>
							))}
						</div>
						<Paragraph variant='5' tag='p' className='mt-10 text-text-secondary'>
							Резюме опубликовано
							{' '}
							{format(new Date(2022, 0, 18, 19, 20), 'dd MMMM в HH:mm', {
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

export default ResumeIdPage;
