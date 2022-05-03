import Props from './InputPhone.props';
import Paragraph from '../Paragraph';
import { useState } from 'react';
import { getContainerBorder, getIconColor, getInputColor, getTextColor } from './InputPhone.styles';
import { formatPhoneNumberIntl } from 'react-phone-number-input';

import PhoneIcon from '../../assets/communication/phone.svg';
import CloseIcon from '../../assets/general/close.svg';

const InputPhone: React.FC<Props> = ({ className = '', onFocus, onBlur, value,
	isDanger, onClear, onChange, inputClassname = '', ...props }) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div
			className={className + ' bg-gray-40 p-4 rounded-xl grid grid-cols-[20px_15px_1px_1fr_24px] gap-3 items-center'}
			style={{
				boxShadow: getContainerBorder(isDanger, isFocused),
			}}
		>
			<PhoneIcon className={getIconColor(isDanger, isFocused, value)} />
			<Paragraph variant='5' tag='p' className={getTextColor(isDanger, isFocused, value)}>
				+7
			</Paragraph>
			<div className='w-px h-full bg-gray-100'></div>
			<input
				placeholder='Номер телефона'
				className={inputClassname + ' bg-transparent outline-none ' + getInputColor(isDanger)}
				value={value}
				onChange={(e) => {
					const NUMS = '1234567890';
					
					if(NUMS.includes(e.target.value[e.target.value.length - 1])) {
						const prettied = formatPhoneNumberIntl('+7' + e.target.value).slice(3)
							? formatPhoneNumberIntl('+7' + e.target.value).slice(3)
							: e.target.value;

						e.target.value = prettied;
						if(onChange)
							onChange(e);
					}
				}}
				onFocus={(e) => {
					setIsFocused(true);
					if(onFocus)
						onFocus(e);
				}}
				onBlur={(e) => {
					setIsFocused(false);
					if(onBlur)
						onBlur(e);
				}}
				{...props} />
			{isFocused && (
				<button onClick={onClear}>
					<CloseIcon className='fill-lightBlue' />
				</button>
			)}
		</div>
	);
};

export default InputPhone;
