import { create } from 'zustand';

interface AuthStore {
  accessToken: string | null;
  isAuthLoading: boolean;
  setAccessToken: (token: string) => void;
  setAuthLoading: (flag: boolean) => void;
  resetToken: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: '',
  isAuthLoading: true,
  setAccessToken: (token) => set({ accessToken: token }),
  setAuthLoading: (flag) => set({ isAuthLoading: flag }),
  resetToken: () => set({ accessToken: null }),
}));
