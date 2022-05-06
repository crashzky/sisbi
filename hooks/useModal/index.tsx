import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Response } from './useModal.props';

const useModal = (items: string[]): Response => {
	const router = useRouter();
	const [activeModal, setActiveModal] = useState(null);

	useEffect(() => {
		setActiveModal(null);

		items.forEach((i) => {
			if(router.query.modal === i && !activeModal)
				setActiveModal(i);
		});
	}, [router]);

	return {
		activeModal,
	};
};

export default useModal;
