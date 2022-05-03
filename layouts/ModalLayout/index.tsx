import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Props from './ModalLayout.props';

const ModalLayout: React.FC<Props> = ({ children, modals, ...props }) => {
	const router = useRouter();

	const [openedModal, setOpenedModal] = useState<null | string>(null);

	useEffect(() => {
		setOpenedModal(null);
		Object.keys(modals).forEach((i) => {
			if(!openedModal && router.query.modal === i)
				setOpenedModal(i);
		});
	}, [router]);
	
	return (
		<div
			style={{
				height: openedModal ? '100vh' : '',
				width: openedModal ? '100vw' : '',
				overflow: openedModal ? 'hidden' : '',
			}}
			{...props}
		>
			<div
				className='absolute w-screen h-screen bg-[rgba(24,25,31,0.3)] justify-center items-center z-10'
				style={{
					display: openedModal ? 'flex' : 'none',
				}}
			>
				{modals[openedModal]}
			</div>
			{children}
		</div>
	);
};

export default ModalLayout;
