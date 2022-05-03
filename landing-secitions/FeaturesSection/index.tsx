import { useRouter } from 'next/router';
import Button from '../../components/Button';
import FeatureCard from '../../components/FeatureCard';
import Headline from '../../components/Headline';
import Paragraph from '../../components/Paragraph';
import { FEATURES_ITEMS } from '../../shared/consts/landing';
import Props from './FeaturesSections.props';

const FeaturesSection: React.FC<Props> = ({ className = '', ...props }) => {
	const router = useRouter();

	return (
		<section id='resumes' className={className + ' '} {...props}>
			<Headline variant='3' tag='h2' className='font-bold text-center'>
				Особенности сервиса
			</Headline>
			<Paragraph variant='3' tag='p' className='mt-3 mb-16 text-center'>
				Если коротко — мы сделали поиск работы
				<br />
				и сотрудников проще и удобнее
			</Paragraph>
			<div className='flex gap-[50px] justify-center mb-16'>
				{FEATURES_ITEMS.map((i, num) => (
					<FeatureCard
						key={num}
						className='a max-w-[276px]'
						{...i} />
				))}
			</div>
			<div className='grid grid-cols-2 gap-4 h-12 w-[363px] mt-8 mx-auto'>
				<Button onClick={() => {
					router.push({
						pathname: '/',
						query: {
							modal: 'signup',
						},
					});
				}}
				>
					Искать работу
				</Button>
				<Button
					variant='outline'
					onClick={() => {
						router.push({
							pathname: '/',
							query: {
								modal: 'signup',
							},
						});
					}}
				>
					Искать сотрудников
				</Button>
			</div>
		</section>
	);
};

export default FeaturesSection;
