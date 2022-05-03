import Paragraph from '../../components/Paragraph';
import Props from './SmsCodeModal.props';

import CrossIcon from '../../assets/general/close.svg';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import SmsCode from '../../components/SmsCode';

const SmsCodeModal: React.FC<Props> = ({ className = '', ...props }) => {
	const router = useRouter();

	return (
		<aside 
			className={className + ' bg-white rounded-2xl p-6 w-[362px]'}
			{...props}
		>
			<div className='flex justify-between mb-6'>
				<Paragraph variant='1' tag='h2' className='font-semibold'>
					Код подтверждения
				</Paragraph>
				<button onClick={() => router.push('/')}>
					<CrossIcon className='fill-icon-secondary' /> 
				</button>
			</div>
			<SmsCode className='mb-6' onCodeSubmit={(code) => console.log(code)} />
			<button className='mb-6 mx-auto block font-semibold text-xs text-darkBlue'>
				Выслать код повторно через 1:56
			</button>
			<Button className='w-full h-14'>
				Подтвердить
			</Button>
		</aside>
	);
};

export default SmsCodeModal;
