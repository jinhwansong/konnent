import { create } from 'zustand';

interface AuthStore {
  accessToken: string | null;
  isAuthLoading: boolean;
  setAccessToken: (token: string) => void;
  setAuthLoading: (loading: boolean) => void;
  resetToken: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  isAuthLoading: true,
  setAccessToken: (token) => set({ accessToken: token }),
  setAuthLoading: (loading) => set({ isAuthLoading: loading }),
  resetToken: () =>
    set({
      accessToken: null,
      isAuthLoading: false,
    }),
}));
