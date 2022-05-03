import Image from 'next/image';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import Headline from '../../components/Headline';
import Paragraph from '../../components/Paragraph';
import Props from './MainSection';

const MainSection: React.FC<Props> = ({ className = '', ...props }) => {
	const router = useRouter();

	return (
		<section id='main' className={className + ' grid grid-cols-between'} {...props}>
			<div className='self-center'>
				<Headline className='font-bold' tag='h1' variant='2'>
					SISBI — новый сервис
					{' '}
					<br />
					по поиску работы
				</Headline>
				<Paragraph variant='3' tag='p' className='mt-4'>
					Создайте резюме в пару шагов, общайтесь с
					<br />
					работодателями через наш встроенный мессенджер!
				</Paragraph>
				<div className='grid grid-cols-2 gap-4 h-12 w-[363px] mt-8'>
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
			</div>
			<div></div>
			<Image src='/assets/og_image.svg' width={552} height={402} alt='landings' />
		</section>
	);
};

export default MainSection;
