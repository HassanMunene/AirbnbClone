// This hook will control whether the Login modal will be open or not
import { create } from "zustand";

const useLoginModal = create((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false}),
}));

export default useLoginModal;