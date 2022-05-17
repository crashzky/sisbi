import Props from './TarifCard.props';

import RadioIcon from '../../assets/radio.svg';
import RadioActiveIcon from '../../assets/radio_active.svg';
import Paragraph from '../Paragraph';

const TarifCard: React.FC<Props> = ({ className = '', label, priceTitle, description, isActive, ...props }) => {
	return (
		<article
			className={className
				+ ' grid gap-3 p-4 border-[1px] bg-white outline-none border-gray-60 rounded-xl cursor-pointer'}
			{...props}
		>
			<div className='flex justify-between items-center'>
				<Paragraph variant='4' tag='h3'>
					{label}
				</Paragraph>
				{isActive ? (
					<RadioActiveIcon className='rounded-full' />
				) : (
					<RadioIcon className='rounded-full' />
				)}
			</div>
			<span className='bg-softGold w-fit rounded-[4px] py-1 px-2 text-sm'>
				{priceTitle}
			</span>
			<Paragraph variant='6' tag='p' className='text-text-secondary'>
				{description}
			</Paragraph>
		</article>
	);
};

export default TarifCard;
