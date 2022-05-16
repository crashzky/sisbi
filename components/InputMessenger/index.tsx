import Props from './InputMessenger.props';

//import MicSolidIcon from '../../assets/media/Mic_solid.svg';
import SendSolidIcon from '../../assets/communication/send_solid.svg';

const InputMessenger: React.FC<Props> = ({ className = '', ref, ...props }) => {
	return (
		<div ref={ref} className={className + ' grid grid-cols-[1fr_52px] h-[52px] gap-4'}>
			<input
				placeholder='Сообщение'
				className='p-4 rounded-xl text-sm h-full outline-none placeholder:text-text-secondary'
				style={{
					boxShadow: `0px 7px 4px rgba(35, 47, 59, 0.02), 0px 3px 3px rgba(35, 47, 59, 0.03),
						0px 1px 2px rgba(35, 47, 59, 0.03), 0px 0px 0px rgba(35, 47, 59, 0.03)`,
				}}
				{...props} />
			<button className='bg-lightBlue h-full w-full rounded-full'>
				<SendSolidIcon className='fill-white mx-auto scale-75' />
			</button>
		</div>
	);
};

export default InputMessenger;
