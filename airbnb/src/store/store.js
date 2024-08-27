import { create } from "zustand";
import { createAuthSlice } from "./slices/AuthenticationSlice";

export const useAirbnbStore = create((set) => ({
    ...createAuthSlice(set)
}));