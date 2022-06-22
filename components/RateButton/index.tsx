import Props from './RateButton.props';

import RateIcon from '../../assets/general/rate.svg';

const RateButton: React.FC<Props> = ({ className = '', isActive, ...props }) => {
	return (
		<button
			className={className
				+ ' p-[10px] rounded-full '
				+ (isActive ? 'bg-lightBlue border-lightBlue border-[1px]' : 'border-[1px] border-gray-100')}
			{...props}
		>
			<RateIcon className={isActive ? 'fill-white' : 'fill-gray-400'} />
		</button>
	);
};

export default RateButton;
