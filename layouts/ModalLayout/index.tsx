import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Props from './ModalLayout.props';

const ModalLayout: React.FC<Props> = ({ children, modals, ...props }) => {
	const router = useRouter();

	const [openedModal, setOpenedModal] = useState<null | string>(null);

	useEffect(() => {
		setOpenedModal(null);

		let foundedElement = null;

		if(props.openedModal)
			setOpenedModal(props.openedModal);
		
		Object.keys(modals).forEach((i) => {
			if(!foundedElement && router.query.modal === i) {
				foundedElement = i;
				setOpenedModal(i);
			}
		});
	}, [router, router.query, props.openedModal]);
	
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
