import Paragraph from '../Paragraph';
import Props from './HelpCard.props';

const HelpCard: React.FC<Props> = ({ className = '', label, description, ...props }) => {
	return (
		<article className={className + ' border-[1px] border-button-secondary rounded-xl p-6'} {...props}>
			<Paragraph variant='2' tag='h3' className='font-bold mb-3'>
				{label}
			</Paragraph>
			<Paragraph variant='5' tag='p'>
				{description}
			</Paragraph>
		</article>
	);
};

export default HelpCard;
