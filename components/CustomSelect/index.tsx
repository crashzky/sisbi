import Paragraph from '../Paragraph';
import Props from './CustomSelect.props';
import { useState } from 'react';

import DropdownArrowIcon from '../../assets/arrows/dropdown_arrow.svg';
import CheckIcon from '../../assets/general/check.svg';
import { MAIN_SHADOW } from '../../shared/consts/shadows';

const CustomSelect: React.FC<Props> = ({ className = '', value, options, onChange, subLabels, ...props }) => {
	const [isOpened, setIsOpened] = useState(false);

	return (
		<div
			className={className + ' relative'}
			{...props}
		>
			<input
				className='absolute w-full h-full opacity-0 cursor-pointer'
				onFocus={() => setIsOpened(true)}
				onBlur={() => setTimeout(() => setIsOpened(false), 100)} />
			<div className='flex items-center'>
				<Paragraph variant='6' tag='p' className='text-text'>
					{value && value.label}
				</Paragraph>
				<DropdownArrowIcon className='fill-icon scale-50' />
			</div>
			{isOpened && (
				<div
					className='absolute z-20 top-10 right-0 grid bg-white rounded-b-2xl'
					style={{
						boxShadow: MAIN_SHADOW,
						width: subLabels ? '272px' : '186px',
					}}
				>
					{options.map((i, num) => (
						<button
							key={num}
							className={`p-4 w-full flex justify-between items-center text-left
								border-b-[1px] border-button-secondary`}
							onClick={() => {
								if(onChange)
									onChange(i);
							}}
						>
							<Paragraph variant='5' tag='span'>
								{i.label}
								<br />
								{(subLabels && subLabels.find((j) => j.value === i.value)) && (
									<span className='text-red text-xs font-normal'>
										{subLabels.find((j) => j.value === i.value).label}
									</span>
								)}
							</Paragraph>
							{value.value === i.value && (
								<CheckIcon className='scale-[0.83] fill-lightBlue' />
							)}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default CustomSelect;
