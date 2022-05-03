import Headline from '../../components/Headline';
import HelpCard from '../../components/HelpCard';
import { HELP_ITEMS } from '../../shared/consts/landing';
import Props from './HelpSection.props';

const HelpSection: React.FC<Props> = ({ className = '', ...props }) => {
	return (
		<section id='help' className={className + ' '} {...props}>
			<Headline variant='3' tag='h2' className='font-bold text-center mb-10'>
				Самые часто задаваемые вопросы
			</Headline>
			<div className='grid grid-cols-2 gap-4'>
				{HELP_ITEMS.map((i, num) => <HelpCard key={num} {...i} />)}
			</div>
		</section>
	);
};

export default HelpSection;
