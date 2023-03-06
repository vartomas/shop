import { create } from 'zustand';
import { UserProfile } from '@/types/userModel';
import { getUser, logOut, login, signUp, updateUser } from '@/utils/api/userApi';
import { useToast } from './useToast';

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
    const toast = useToast.getState().toast;
    set(() => ({ loading: true }));
    const { data: user, error } = await login(email, password);
    if (user) {
      set(() => ({ currentUser: user }));
      toast({ type: 'success', message: 'Logged in' });
    }

    if (error) {
      toast({ type: 'error', message: 'Wrong email or password' });
    }

    set(() => ({ loading: false }));
  },
  signUp: async (email, password) => {
    const toast = useToast.getState().toast;
    set(() => ({ loading: true }));
    const { data: user, error } = await signUp(email, password);
    if (user) {
      set(() => ({ currentUser: user }));
      toast({ type: 'success', message: 'Account created' });
    }

    if (error) {
      toast({ type: 'error', message: 'Email already exists in database' });
    }

    set(() => ({ loading: false }));
  },
  logOut: async () => {
    const toast = useToast.getState().toast;
    set(() => ({ loading: true }));
    await logOut();
    set(() => ({ currentUser: null }));
    set(() => ({ loading: false }));
    toast({ type: 'info', message: 'Logged out' });
  },
  updateUser: async (profile) => {
    const toast = useToast.getState().toast;
    set(() => ({ loading: true }));
    const { data: user, error } = await updateUser(profile);
    if (user) {
      set((state) => ({
        currentUser: { ...profile, email: state.currentUser?.email ? state.currentUser?.email : '' },
      }));
      toast({ type: 'success', message: 'Profile updated' });
    }

    if (error) {
      toast({ type: 'error', message: 'Failed to update profile, please try again later' });
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
