import Image from 'next/image';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import Headline from '../../components/Headline';
import Paragraph from '../../components/Paragraph';
import MainLayout from '../../layouts/MainLayout';

const CompanyPage = (): JSX.Element => {
	const data = {
		name: 'Its wooble',
		phone: '79221642934',
		email: 'mail@mail.ru',
		avatar: `https://api.sisbi.ru/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2Fn
		ZSI6IkJBaHBDdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--571a66a8d868bd1d0835aa595f37ee39ae3898fc/ey
		JfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnN
		IYVFJTkFXa0NEUUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--8b32305256f0ea7f55dbcdd0d7e4e0c4221cac8b/wooble.png`,
		about: `Мы небольшая команда, создающая IT-решения для бизнеса разной направленности и сложности. Разрабатываем
		сайты, приложения, дизайн и предоставляем услуги по доработке уже существующих продуктов.`,
	};

	return (
		<MainLayout className='bg-[#FAFBFC] pt-10 px-40'>
			<section
				className='flex justify-between items-start pb-12 border-b-[1px] border-gray-80'
			>
				<div>
					<Headline variant='5' tag='h1' className='font-bold mb-4'>
						{data ? data.name : 'Загрузка...'}
					</Headline>
					<Paragraph variant='3' tag='p' className='mb-1'>
						{data && data.phone ? formatPhoneNumberIntl('+' + data.phone) : ''}
					</Paragraph>
					<Paragraph variant='3' tag='p' className='mb-1'>
						{data && data.email}
					</Paragraph>
				</div>
				{data && data.avatar ? (
					<Image
						width={173}
						height={173}
						className='object-cover rounded-2xl'
						src={data.avatar}
						alt='avatar' />
				) : ''}
			</section>
			<section className='pt-4 pb-8'>
				<Paragraph variant='1' tag='h2' className='font-semibold mb-4'>
					О компании
				</Paragraph>
				{(data && data.about) && data.about.split('<br>').map((i, num) => {
					if(num != data.about.split('<br>').length - 1) {
						return (
							<Paragraph key={num} variant='5' tag='p' className='max-w-[550px]'>
								{i}
								<br />
							</Paragraph>
						);
					}
					else {
						return (
							<Paragraph key={num} variant='5' tag='p' className='max-w-[550px]'>
								{i}
							</Paragraph>
						);
					}
				})}
			</section>
		</MainLayout>
	);
};

export default CompanyPage;
