import Props from './BackButton.props';

import ArrowIcon from '../../assets/arrows/caret_left.svg';
import Paragraph from '../Paragraph';
import { useRouter } from 'next/router';

const BackButton: React.FC<Props> = ({ className = '', title = 'Вернуться назад', href, ...props }) => {
	const router = useRouter();

	return (
		<button
			className={className + ' grid grid-flow-col w-fit items-center'}
			onClick={() => router.push(href)}
			{...props}
		>
			<ArrowIcon className='fill-icon' />
			<Paragraph variant='5' tag='p' className='text-text'>
				{title}
			</Paragraph>
		</button>
	);
};

export default BackButton;
