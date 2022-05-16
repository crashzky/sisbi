import Paragraph from '../Paragraph';
import Props from './CustomSelect.props';
import { useState } from 'react';

import DropdownArrowIcon from '../../assets/arrows/dropdown_arrow.svg';
import CheckIcon from '../../assets/general/check.svg';
import { MAIN_SHADOW } from '../../shared/consts/shadows';

const CustomSelect: React.FC<Props> = ({ className = '', value, options, onChange, ...props }) => {
	const [isOpened, setIsOpened] = useState(false);

	return (
		<div
			className={className + ' relative cursor-pointer'}
			tabIndex={0}
			onFocus={() => setIsOpened(true)}
			onBlur={() => setTimeout(() => setIsOpened(false), 20)}
			{...props}
		>
			<div className='flex items-center'>
				<Paragraph variant='6' tag='p' className='text-text'>
					{value && value.label}
				</Paragraph>
				<DropdownArrowIcon className='fill-icon scale-50' />
			</div>
			{isOpened && (
				<div
					className='absolute z-20 top-10 right-0 w-[186px] grid bg-white rounded-b-2xl'
					style={{
						boxShadow: MAIN_SHADOW,
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
