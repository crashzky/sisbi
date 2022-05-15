import Props from './InputSearch.props';
import { useState } from 'react';
import { getContainerBorder, getIconColor, getInputColor } from './InputSearch.styles';

import SearchIcon from '../../assets/navigation/search.svg';
import CloseIcon from '../../assets/general/close.svg';

const InputSearch: React.FC<Props> = ({ className = '', onFocus, onBlur, value,
	isDanger, onClear, inputClassname = '', ...props }) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div
			className={className + ' p-4 rounded-xl grid grid-cols-[20px_1fr_24px] gap-[14px] items-center'}
			style={{
				boxShadow: getContainerBorder(isDanger, isFocused),
			}}
		>
			<SearchIcon className={getIconColor(isDanger, isFocused, value)} />
			<input
				className={inputClassname + ' bg-transparent outline-none ' + getInputColor(isDanger)}
				value={value}
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

export default InputSearch;
