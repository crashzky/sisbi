import Props from './Switch.props';

const Switch: React.FC<Props> = ({ className = '', id, ...props }) => {
	return (
		<label htmlFor={id} className='flex items-center cursor-pointer'>
			<div className='relative'>
				<input
					type='checkbox'
					id={id}
					className={className + 'switch sr-only'}
					{...props} />
				<div className='block bg-gray-100 w-10 h-6 rounded-full'></div>
				<div className='dot absolute left-[3px] top-[3px] bg-white w-[18px] h-[18px] rounded-full transition'></div>
			</div>
		</label>
	);
};

export default Switch;
