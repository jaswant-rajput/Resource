import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  setUser: (data) => set((state) => ({ user: data })),
  setUserFromLocalStorage: (data) => set((state) => ({ user: data })),
  // updateUserProfileStatus : (data) => set((state) => ({ user: data})),
}));
