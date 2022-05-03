import { useEffect, useRef, useState } from 'react';
import Props from './SmsCode.props';

const SmsCode: React.FC<Props> = ({ className = '', onCodeSubmit, ...props }) => {
	const [code, setCode] = useState('');
	const [focusedItem, setFocusedItem] = useState(null);

	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const ref3 = useRef(null);
	const ref4 = useRef(null);

	const BLOCKS_REFS = [ref1, ref2, ref3, ref4];

	useEffect(() => {
		if(code.length === 4)
			onCodeSubmit(code);
	}, [code]);

	return (
		<div className={className + ' flex gap-2'} {...props}>
			{BLOCKS_REFS.map((i, num) => (
				<div
					key={num}
					className=' w-14 h-14 bg-gray-40 rounded-lg p-4'
					style={{
						boxShadow: focusedItem === num && 'inset 0 0 0 1.5px #739EF1',
					}}
				>
					<input
						ref={i}
						className='bg-transparent w-full outline-none text-center'
						onFocus={() => {
							i.current.value = '';
							setFocusedItem(num);
						}}
						onBlur={() => {
							setFocusedItem(null);
						}}
						onChange={(e) => {
							setCode((prev) => prev + e.target.value);

							if(num + 1 < BLOCKS_REFS.length)
								BLOCKS_REFS[num + 1].current.focus();
							else
								i.current.blur();
						}} />
				</div>
			))}
		</div>
	);
};

export default SmsCode;
