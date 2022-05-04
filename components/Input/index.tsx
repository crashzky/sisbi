import { useState, useRef } from 'react';
import Props from './Input.props';

import CloseIcon from '../../assets/general/close.svg';

const Input: React.FC<Props> = ({ className = '', inputClassname = '', onFocus, onBlur, ...props }) => {
	const [isFocused, setIsFocused] = useState(false);

	const inputRef = useRef(null);

	return (
		<div
			className={className + ' grid grid-cols-[1fr_24px] bg-gray-40 rounded-xl py-4.5 px-4'}
			style={{
				boxShadow: isFocused ? 'inset 0 0 0 1.5px #739EF1' : '',
			}}
		>
			<input
				ref={inputRef}
				className={inputClassname
					+ ' w-full bg-transparent outline-none border-none'
					+ ' placeholder:text-text-secondary'
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
