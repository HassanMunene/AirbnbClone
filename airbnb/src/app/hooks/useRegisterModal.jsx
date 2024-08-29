//create a hook that will control the opening and closing of RegisterModal

import { create } from "zustand";

const useRegisterModal = create ((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export default useRegisterModal;