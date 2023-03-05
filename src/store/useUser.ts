import { create } from 'zustand';
import { UserProfile } from '@/types/userModel';
import { getUser, logOut, login, signUp, updateUser } from '@/utils/api/userApi';

interface UserState {
  currentUser: UserProfile | null;
  loading: boolean;
  setUser: (user: UserProfile) => void;
  login: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  logOut: () => void;
  updateUser: (profile: UserProfile) => void;
  getUser: () => void;
}

export const useUser = create<UserState>((set) => ({
  currentUser: null,
  loading: false,
  setUser: (user) => set(() => ({ currentUser: user })),
  login: async (email, password) => {
    set(() => ({ loading: true }));
    const { data: user } = await login(email, password);
    if (user) {
      set(() => ({ currentUser: user }));
    }

    set(() => ({ loading: false }));
  },
  signUp: async (email, password) => {
    set(() => ({ loading: true }));
    const { data: user } = await signUp(email, password);
    if (user) {
      set(() => ({ currentUser: user }));
    }

    set(() => ({ loading: false }));
  },
  logOut: async () => {
    set(() => ({ loading: true }));
    await logOut();
    set(() => ({ currentUser: null }));
    set(() => ({ loading: false }));
  },
  updateUser: async (profile) => {
    set(() => ({ loading: true }));
    const { data: user } = await updateUser(profile);
    if (user) {
      set((state) => ({
        currentUser: { ...profile, email: state.currentUser?.email ? state.currentUser?.email : '' },
      }));
    }

    set(() => ({ loading: false }));
  },
  getUser: async () => {
    set(() => ({ loading: true }));
    const { data: user } = await getUser();
    if (user) {
      set(() => ({ currentUser: user }));
    }
    set(() => ({ loading: false }));
  },
}));
