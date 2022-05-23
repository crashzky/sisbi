import Props from './Radio.props';

const Radio: React.FC<Props> = ({ className = '', items, name, value, ...props }) => {
	return (
		<div className={className}>
			{items.map((i, num) => (
				<div key={num} className='grid grid-flow-col w-fit items-center gap-2'>
					<input
						type='radio'
						className='custom-radio cursor-pointer w-5 h-5'
						id={`${name}-${num}`}
						name={name}
						value={i}
						checked={value === i}
						{...props} />
					<label className='cursor-pointer text-sm' htmlFor={`${name}-${num}`}>
						{i}
					</label>
				</div>
			))}
		</div>
	);
};

export default Radio;
