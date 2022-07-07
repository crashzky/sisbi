import Image from 'next/image';
import Headline from '../../components/Headline';
import Paragraph from '../../components/Paragraph';
import Props from './MobileAppSection.props';

import AppStoreLIcon from '../../assets/app-store-L.svg';
import GooglePlayLIcon from '../../assets/google-play-L.svg';
import Link from 'next/link';

const MobileAppSection: React.FC<Props> = ({ className = '', ...props }) => {
	return (
		<section id='mobile' className={className + ' bg-[#F3F3F5] pt-[22px] grid grid-cols-[auto_1fr] gap-[172px]'} {...props}>
			<Image
				src='/assets/mobile_app.png'
				width={461}
				height={324}
				alt='mobile app' />
			<div className='self-center'>
				<Headline variant='4' tag='h2' className='font-bold mb-2'>
					Скачайте наше
					{' '}
					<br />
					мобильное приложение
				</Headline>
				<Paragraph variant='4' tag='p' className='mb-4'>
					Такого вы еще не видели. Ищите работу или сотрудников,
					<br />
					свайпая карточки. Лучше один раз увидеть, чем 100 раз прочитать.
				</Paragraph>
				<div className='grid grid-flow-col gap-2 w-min'>
					<Link href='#'>
						<a>
							<AppStoreLIcon />
						</a>
					</Link>
					<Link href='#'>
						<a>
							<GooglePlayLIcon />
						</a>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default MobileAppSection;
