import Paragraph from '../Paragraph';
import Props from './FeatureCard.props';

const FeatureCard: React.FC<Props> = ({ Icon, label, description, ...props }) => {
	return (
		<article {...props}>
			<div className='w-[65px] h-[65px] mx-auto mb-4 flex justify-center items-center rounded-full bg-darkBlue'>
				<Icon className='fill-white' />
			</div>
			<Paragraph variant='2' tag='h3' className='text-center font-bold mb-4'>
				{label}
			</Paragraph>
			<Paragraph variant='4' tag='p' className='text-center'>
				{description}
			</Paragraph>
		</article>
	);
};

export default FeatureCard;
