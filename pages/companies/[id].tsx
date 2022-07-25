import Image from 'next/image';
import { useRouter } from 'next/router';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { useQuery } from 'react-query';
import Headline from '../../components/Headline';
import Paragraph from '../../components/Paragraph';
import MainLayout from '../../layouts/MainLayout';
import { getEmployerById } from '../../shared/api/employer';
import { IGetEmployerQueryKey } from '../../shared/types/api/employer';

const CompanyPage = (): JSX.Element => {
	const router = useRouter();

	const { data, isSuccess } = useQuery([{ id: +(router.query.id as string) }, 'get_employer'] as IGetEmployerQueryKey,
		getEmployerById, {
			enabled: !!router && !!router.query.id,
		});

	return (
		<MainLayout className='bg-[#FAFBFC] pt-10 px-40'>
			<section
				className='flex justify-between items-start pb-12 border-b-[1px] border-gray-80'
			>
				<div>
					<Headline variant='5' tag='h1' className='font-bold mb-4'>
						{isSuccess ? data.payload.name : 'Загрузка...'}
					</Headline>
					<Paragraph variant='3' tag='p' className='mb-1'>
						<a href={`tel:${data && data.payload.phone}`}>
							{isSuccess && data.payload.phone ? formatPhoneNumberIntl('+' + data.payload.phone) : ''}
						</a>
					</Paragraph>
					<Paragraph variant='3' tag='p' className='mb-1'>
						<a href={`mailto:${isSuccess && data.payload.email}`}>
							{isSuccess && data.payload.email}
						</a>
					</Paragraph>
				</div>
				{isSuccess && data.payload.avatar ? (
					<Image
						width={173}
						height={173}
						className='object-cover rounded-2xl'
						src={data.payload.avatar}
						alt='avatar' />
				) : ''}
			</section>
			<section className='pt-4 pb-8ç'>
				<Paragraph variant='1' tag='h2' className='font-semibold mb-4'>
					О компании
				</Paragraph>
				{(isSuccess && data.payload.about) && data.payload.about.split('\n').map((i, num) => {
					if(num != data.payload.about.split('\n').length - 1) {
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
