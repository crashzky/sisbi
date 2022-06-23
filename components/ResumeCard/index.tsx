import Image from 'next/image';
import Props from './ResumeCard.props';
import Paragraph from '../Paragraph';
import Button from '../Button';
import { intervalToDuration, isValid } from 'date-fns';
import yearsToText from '../../utils/yearsToText';
import RateButton from '../RateButton';
import { useState } from 'react';
import useUserType from '../../hooks/useUserType';

const ResumeCard: React.FC<Props> = ({ className = '', avatar, name, surname, birthday, onRespond, city,
	vacancyName, about, skills, tags, minSalary, isFavorited, onAddToFavorites, onRemoveFromFavorited, ...props }) => {
	const { userType } = useUserType();

	const interval = intervalToDuration({
		start: isValid(birthday) ? birthday : new Date(Date.now()),
		end: new Date(Date.now()),
	});

	const [_isFavorited, setIsFavorited] = useState(isFavorited);

	return (
		<article
			className={className
				+ ' border-[1px] cursor-pointer border-gray-100 p-4 grid gap-8 '
				+ (avatar ? 'grid-cols-[156px_1fr]' : '')}
			{...props}
		>
			{avatar && (
				<div>
					<Image
						src={avatar}
						className='object-cover rounded-3xl'
						width={156}
						height={156}
						alt='vacancy' />
				</div>
			)}
			<div>
				<Paragraph variant='6' tag='p' className='text-text-secondary mb-3'>
					{`${name} ${surname}, ${interval.years} ${yearsToText(interval.years)}, ${city}`}
				</Paragraph>
				<Paragraph variant='1' tag='h2' className='font-bold mb-1'>
					{vacancyName}
				</Paragraph>
				<Paragraph variant='1' tag='p' className='font-bold text-text mb-3'>
					от
					{' '}
					{new Intl.NumberFormat('ru-RU').format(minSalary)}
					<span className='font-rouble text-xl text-text'>
						{'c'}
					</span>
				</Paragraph>
				<Paragraph variant='6' tag='p' className='mb-3'>
					Навыки:
					{' ' }
					{skills.join(', ')}
				</Paragraph>
				<Paragraph variant='6' tag='p' className='mb-3'>
					{about}
				</Paragraph>
				<div className='flex flex-wrap gap-2 mb-6'>
					{tags.map((i, num) => (
						<span key={num} className='s bg-softGold py-0.5 px-1 rounded-[4px]'>
							{i}
						</span>
					))}
				</div>
				<div className='flex justify-between'>
					<div>
						{localStorage.getItem('user_type') === 'employer' && (
							<Button
								variant='outline_secondary'
								size='S'
								className='w-[190px] h-9'
								onClick={onRespond}
							>
								Отправить приглашение
							</Button>
						)}
					</div>
					{userType === 'employer' && (
						<RateButton
							isActive={_isFavorited}
							onClick={() => {
								if(_isFavorited)
									onRemoveFromFavorited();
								else
									onAddToFavorites();

								setIsFavorited((prev) => !prev);
							}} />
					)}
				</div>
			</div>
		</article>
	);
};

export default ResumeCard;
