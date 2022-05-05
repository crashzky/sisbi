import { useState, useRef } from 'react';
import Props from './Input.props';
import { getBorder, getTextColor } from './Input.styles';

import CloseIcon from '../../assets/general/close.svg';

const Input: React.FC<Props> = ({ className = '', inputClassname = '', onFocus, onBlur, isDanger, ...props }) => {
	const [isFocused, setIsFocused] = useState(false);

	const inputRef = useRef(null);

	return (
		<div
			className={className + ' grid grid-cols-[1fr_24px] bg-gray-40 rounded-xl py-4.5 px-4'}
			style={{
				boxShadow: getBorder(isFocused, isDanger),
			}}
		>
			<input
				ref={inputRef}
				className={inputClassname
					+ ' w-full bg-transparent outline-none border-none'
					+ ' '
					+ getTextColor(isFocused, isDanger)
				}
				onFocus={(e) => {
					setTimeout(() => setIsFocused(true), 1);

					if(onFocus)
						onFocus(e);
				}}
				onBlur={(e) => {
					setTimeout(() => setIsFocused(false), 1);

					if(onFocus)
						onBlur(e);
				}}
				{...props} />
			{isFocused && (
				<button
					onClick={() => {
						inputRef.current.value = '';
					}}
				>
					<CloseIcon className='fill-lightBlue' />
				</button>
			)}
		</div>
	);
};

export default Input;
