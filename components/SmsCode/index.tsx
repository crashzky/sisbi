import { useEffect, useRef, useState } from 'react';
import Props from './SmsCode.props';
import { getBorder } from './SmsCode.styles';

const SmsCode: React.FC<Props> = ({ className = '', onCodeChanged, isDanger, ...props }) => {
	const [code, setCode] = useState(['', '', '', '']);
	const [focusedItem, setFocusedItem] = useState(null);

	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const ref3 = useRef(null);
	const ref4 = useRef(null);

	const BLOCKS_REFS = [ref1, ref2, ref3, ref4];

	useEffect(() => {
		onCodeChanged(code.join(''));
	}, [code]);

	useEffect(() => {
		if(ref1.current)
			ref1.current.focus();
	}, []);

	return (
		<div className={className + ' grid grid-flow-col gap-2'} {...props}>
			{BLOCKS_REFS.map((i, num) => (
				<div
					key={num}
					className=' w-14 h-14 bg-gray-40 rounded-lg p-4'
					style={{
						boxShadow: getBorder(focusedItem === num, isDanger),
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
							setCode((prev) => {
								let _prev = [...prev];
								_prev[num] = e.target.value;

								return _prev;
							});

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
