// This hook will control whether the modal for creating a listing is open or not
import { create } from "zustand";

const useCreateListingModal = create((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false})
}));

export default useCreateListingModal;