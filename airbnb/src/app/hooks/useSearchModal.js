import { create } from "zustand";

// Create a zustand store for managing the state of the search modal
const useSearchModal = create((set) => ({
    // Initial state: modal is open
    isOpen: false,

    // Function to open the modal
    onOpen: () => set({ isOpen: true }),

    // Function to close the modal
    onClose: () => set({ isOpen: false })
}));

export default useSearchModal;