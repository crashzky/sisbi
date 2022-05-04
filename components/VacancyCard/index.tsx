import Image from 'next/image';
import Props from './VacancyCard.props';
import Paragraph from '../Paragraph';
import Button from '../Button';

import CompanyIcon from '../../assets/company.svg';

const VacancyCard: React.FC<Props> = ({ className = '', imageSrc, companyName, label, minPrice, description, tags,
	...props }) => {
	return (
		<article
			className={className
				+ ' border-[1px] cursor-pointer border-gray-100 p-4 grid grid-cols-[156px_1fr] gap-8'}
			{...props}
		>
			<div>
				<Image
					src={imageSrc}
					className='object-cover'
					width={156}
					height={156}
					alt='vacancy' />
			</div>
			<div>
				<div className='flex gap-2 mb-3'>
					<CompanyIcon />
					<Paragraph variant='6' tag='p' className='text-text'>
						{companyName}
					</Paragraph>
				</div>
				<Paragraph variant='1' tag='h2' className='font-bold mb-1'>
					{label}
				</Paragraph>
				<Paragraph variant='1' tag='p' className='font-bold text-text mb-3'>
					от
					{' '}
					{new Intl.NumberFormat('ru-RU').format(minPrice)}
					{' ₽'}
				</Paragraph>
				<Paragraph variant='6' tag='p' className='mb-3'>
					{description}
				</Paragraph>
				<div className='flex gap-2 mb-6'>
					{tags.map((i, num) => (
						<span key={num} className='s bg-softGold py-0.5 px-1 rounded-[4px]'>
							{i}
						</span>
					))}
				</div>
				<div className='grid grid-cols-[121px_155px_1fr] gap-2'>
					<Button variant='outline_secondary' size='S' className='w-[121px] h-9'>
						Откликнуться
					</Button>
					<Button variant='outline_secondary' size='S' className='w-[155px] h-9'>
						Показать контакты
					</Button>
				</div>
			</div>
		</article>
	);
};

export default VacancyCard;
