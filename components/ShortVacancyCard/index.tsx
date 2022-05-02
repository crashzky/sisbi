import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Props from './ShortVacancyCard.props';

const ShortVacancyCard: React.FC<Props> = ({ className = '', lastUpdate, label, minPrice, description, tags, ...props }) => {
	return (
		<article
			className={className + ' p-4 rounded-xl border-button-secondary border-[1px] cursor-pointer'}
			{...props}
		>
			<p className='text-xs text-text-secondary mb-[2px]'>
				{format(lastUpdate, 'Обновлено dd MMMM в HH:mm', { locale: ru })}
			</p>
			<p className='font-semibold mb-[2px]'>
				{label}
			</p>
			<p className='text-text font-semibold mb-2'>
				от
				{' '}
				{minPrice.toLocaleString()}
				{' ₽'}
			</p>
			<p className='text-xs mb-[52px]'>
				{description.length > 145 ? description.slice(0, 142) + '...' : description}
			</p>
			<div className='flex flex-wrap gap-2'>
				{tags.map((i, num) => (
					<span key={num} className='px-1 py-[2px] bg-softGold text-xs rounded-[4px]'>
						{i}
					</span>
				))}
			</div>
		</article>
	);
};

export default ShortVacancyCard;
