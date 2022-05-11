import Image from 'next/image';
import Props from './InputImage.props';

import CloseIcon from '../../assets/general/close.svg';
import { useState } from 'react';

const InputImage: React.FC<Props> = ({ className = '', noSelectedImage, id, onChange, ...props }) => {
	const [file, setFile] = useState(null);

	return (
		<div className={className + ' grid justify-center gap-y-[10px]'}>
			{(file || noSelectedImage) && (
				<label className='w-[173px] h-[173px] rounded-2xl cursor-pointer relative' htmlFor={id ? id : 'input-image'}>
					<button
						className='rounded-full bg-[rgba(0,0,0,0.2)] p-[9.81px] absolute z-10 right-[7px] top-[7px]'
						onClick={() => setFile(null)}
					>
						<CloseIcon className='fill-white' />
					</button>
					<Image
						className='object-cover rounded-2xl'
						src={file ? (window.URL || window.webkitURL).createObjectURL(file) : noSelectedImage}
						width={173}
						height={173}
						alt='input image' />
				</label>
			)}
			<label className='text-xs text-darkBlue cursor-pointer text-center' htmlFor={id ? id : 'input-image'}>
				Изменить фото
			</label>
			<input
				onChange={(e) => {
					setFile(e.target.files[0]);

					if(onChange)
						onChange(e);
				}}
				type='file'
				accept='image/*'
				id={id ? id : 'input-image'}
				className='w-full h-full hidden'
				{...props} />
		</div>
	);
};

export default InputImage;
