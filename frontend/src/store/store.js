import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    setUser : (data) => set((state) => ({ user : data })),
    setUserFromLocalStorage : (data) => set((state) => ({ user : data })),
    // updateUserProfileStatus : (data) => set((state) => ({ user: data})),
}))
// access data : `const user = useAuthStore.getState().user`
// access set method : `const setStateUser = useAuthStore((state) => state.setUser);`