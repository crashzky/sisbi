import Paragraph from '../../components/Paragraph';
import Props from './DeleteModal.props';
import Button from '../../components/Button';

import PreloaderIcon from '../../assets/loader.svg';
import CloseIcon from '../../assets/general/close.svg';

const DeleteModal: React.FC<Props> = ({ className = '', message, onCancel, onConfirm, isLoading, ...props }) => {
	return (
		<aside className={className + 'bg-white rounded-3xl pt-6 w-[363px]'} {...props}>
			<div className='flex justify-between items-center px-6'>
				<Paragraph variant='1' tag='h2' className='font-semibold'>
					Удалить чат?
				</Paragraph>
				<button onClick={onCancel} className='scale-[1.1] fill-icon-secondary'>
					<CloseIcon />
				</button>
			</div>
			<div className='p-6 border-b-[1px] border-button-secondary'>
				<Paragraph variant='5' tag='p'>
					{message}
				</Paragraph>
			</div>
			<div className='py-4 px-6 flex justify-end gap-2'>
				<Button variant='secondary' className='py-2 px-4' onClick={onCancel}>
					Отмена
				</Button>
				{isLoading ? (
					<PreloaderIcon className='w-9 h-9 mx-[23px] stroke-red' />
				) : (
					<Button variant='danger' className='py-2 px-4' onClick={onConfirm}>
						Удалить
					</Button>
				)}
			</div>
		</aside>
	);
};

export default DeleteModal;
