export const createAuthSlice = (set) => (
    {
        isAuthModalOpen: false,
        openAuthModal: () => set((state) => ({...state, isAuthModalOpen: true})),
        closeAuthModal: () => set((state) => ({...state, isAuthModalOpen: false})), 
    }
);