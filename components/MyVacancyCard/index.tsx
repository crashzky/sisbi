import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { VACANCY_STATES } from '../../shared/consts/stateTypes';
import Button from '../Button';
import Paragraph from '../Paragraph';
import Props from './MyVacancyCard.props';
import { useMutation } from 'react-query';
import { deleteVacancy, putVacancy } from '../../shared/api/vacancies';

import ShareIcon from '../../assets/communication/share_solid.svg';
import DeleteIcon from '../../assets/navigation/trash_solid.svg';
import VisibleIcon from '../../assets/general/visible_solid.svg';
import InvisibleIcon from '../../assets/general/invisible_solid.svg';
import Preloader from '../../assets/loader.svg';

const MyVacancyCard: React.FC<Props> = ({ className = '', imageSrc, label, minPrice, description, tags,
	last_update, vacancyId, shows, views, state, isVisible, ...props }) => {
	const router = useRouter();

	const deleteMutation = useMutation(deleteVacancy, {
		onSuccess: () => {
			router.reload();
		},
	});

	const putVacancyMutation = useMutation(putVacancy, {
		onSuccess: () => {
			router.reload();
		},
	});

	return (
		<article
			className={className
				+ ' border-[1px] cursor-pointer border-gray-100 p-4 grid gap-8 '
				+ (imageSrc ? 'grid-cols-[156px_1fr]' : '')}
			{...props}
		>
			{imageSrc && (
				<div>
					<Image
						src={imageSrc}
						className='object-cover rounded-3xl'
						width={156}
						height={156}
						alt='vacancy' />
				</div>
			)}
			<div>
				<div className='flex justify-between items-start'>
					<div>
						<Paragraph variant='6' tag='p' className='text-text mb-3'>
							Обновленно
							{format(new Date(last_update), ' dd MMMM в HH:mm', {
								locale: ru,
							})}
						</Paragraph>
						<Paragraph variant='1' tag='h2' className='font-bold mb-1'>
							{label}
						</Paragraph>
						<Paragraph variant='1' tag='p' className='font-bold text-text mb-3'>
							от
							{' '}
							{new Intl.NumberFormat('ru-RU').format(minPrice)}
							<span className='font-rouble text-xl text-text'>
								{'c'}
							</span>
						</Paragraph>
					</div>
					<div className='grid grid-flow-col gap-5'>
						<div>
							<Paragraph variant='6' tag='p' className='text-text-secondary mb-1'>
								Показы
							</Paragraph>
							<Paragraph variant='4' tag='p' className='font-semibold'>
								{shows}
							</Paragraph>
						</div>
						<div className='h-full border-r-[1px] border-gray-100'></div>
						<div>
							<Paragraph variant='6' tag='p' className='text-text-secondary mb-1'>
								Просмотры
							</Paragraph>
							<Paragraph variant='4' tag='p' className='font-semibold'>
								{views}
							</Paragraph>
						</div>
						<div className='h-full border-r-[1px] border-gray-100'></div>
						<div>
							<Paragraph variant='6' tag='p' className='text-text-secondary mb-1'>
								Статус
							</Paragraph>
							<Paragraph variant='4' tag='p' className='font-semibold'>
								{VACANCY_STATES[state]}
							</Paragraph>
						</div>
					</div>
				</div>
				<Paragraph variant='6' tag='p' className='mb-3'>
					{description}
				</Paragraph>
				<div className='flex flex-wrap mb-6'>
					{tags.map((i, num) => (
						<span key={num} className=' bg-softGold py-0.5 px-1 m-1 rounded-[4px]'>
							{i}
						</span>
					))}
				</div>
				<div className='grid grid-cols-[121px_155px_1fr_repeat(3,36px)] gap-2'>
					<Button
						onClick={() => router.push(`/my_vacancies/${vacancyId}`)}
						variant='outline_secondary'
						size='S'
						className='w-[121px] h-9'
					>
						Предпросмотр
					</Button>
					<Button
						onClick={() => router.push(`/my_vacancies/${vacancyId}/edit`)}
						variant='outline_secondary'
						size='S'
						className='w-[155px] h-9'
					>
						Редактировать
					</Button>
					<div></div>
					<Button
						variant='outline_secondary'
						className='w-9 h-9 rounded-full'
						onClick={() => router.push(`/vacancies/${vacancyId}`)}
					>
						<ShareIcon
							className='mx-auto fill-icon-secondary'
							width={20}
							height={20} />
					</Button>
					{deleteMutation.isLoading ? (
						<Preloader className='w-9 h-9 stroke-icon-secondary' />
					) : (
						<Button
							onClick={() => deleteMutation.mutate({ id: vacancyId })}
							variant='outline_secondary'
							className='w-9 h-9 rounded-full'
						>
							<DeleteIcon
								className='mx-auto fill-icon-secondary'
								width={20}
								height={20} />
						</Button>
					)}
					{putVacancyMutation.isLoading ? (
						<Preloader className='w-9 h-9 stroke-icon-secondary' />
					) : (
						<Button
							onClick={() => {
								putVacancyMutation.mutate({
									id: vacancyId,
									visible: !isVisible,
								});
							}}
							variant='outline_secondary'
							className='w-9 h-9 rounded-full'
						>
							{isVisible ? (
								<VisibleIcon
									className='mx-auto fill-icon-secondary'
									width={20}
									height={20} />
							) : (
								<InvisibleIcon
									className='mx-auto fill-icon-secondary'
									width={22}
									height={20} />
							)}
						</Button>
					)}
				</div>
			</div>
		</article>
	);
};

export default MyVacancyCard;
