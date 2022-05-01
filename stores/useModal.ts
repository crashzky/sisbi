import create from 'zustand';

interface IModalStore {
	showModal: boolean;
	toggleShowModal: () => void;
}

const useModal = create<IModalStore>((set) => ({
	showModal: false,
	toggleShowModal: () => set((state: any) => ({
		showModal: !state.showModal,
	})),
}));

export default useModal;
