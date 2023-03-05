import { UserProfile } from '@/types/userModel';
import { api } from './api';

export const login = (email: string, password: string) =>
  api.request<UserProfile>({ method: 'POST', url: 'user/login', body: { email, password } });

export const signUp = (email: string, password: string) =>
  api.request<UserProfile>({ method: 'POST', url: 'user/signup', body: { email, password } });

export const logOut = () => api.request({ method: 'POST', url: 'user/logout' });

export const getUser = () => api.get<UserProfile>({ url: 'user/getuser' });

export const updateUser = (profile: UserProfile) =>
  api.request<UserProfile>({ method: 'POST', url: 'user/update', body: profile });
