import { create } from 'zustand';
import { Toast, ToastType } from '@/types/toastModel';

interface ToastState {
  toasts: Toast[];
  toast: ({ type, message, time }: { type: ToastType; message: string; time?: number }) => void;
  closeToast: (id: string) => void;
}

const DEFAULT_DISPLAY_TIME = 3;

export const useToast = create<ToastState>((set) => ({
  toasts: [],
  toast: ({ type, message, time }) => {
    const id = Math.random().toString();
    set((state) => ({ toasts: [...state.toasts, { type, message, id, time: time || DEFAULT_DISPLAY_TIME }] }));

    setTimeout(
      () => set((state) => ({ toasts: state.toasts.filter((x) => x.id !== id) })),
      time ? time * 1000 : DEFAULT_DISPLAY_TIME * 1000
    );
  },
  closeToast: (id: string) => {
    set((state) => ({ toasts: state.toasts.filter((x) => x.id !== id) }));
  },
}));
