import Props from './TarifCheckbox.props';

const TarifCheckbox: React.FC<Props> = ({ className = '', id, label, subLabel, ...props }) => {
	return (
		<div className={className}>
			<input
				id={id ? id : label}
				className='custom-checkbox w-5 h-5 cursor-pointer'
				type='checkbox'
				{...props} />
			<label htmlFor={id ? id : label} className='cursor-pointer flex gap-2'>
				<span>
					{label}
					<br />
					<span className='text-red'>
						{subLabel}
					</span>
				</span>
			</label>
		</div>
	);
};

export default TarifCheckbox;
