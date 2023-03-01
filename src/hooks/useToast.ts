import { ReactNode, createContext, createElement, useContext, useState } from 'react';

type ToastType = 'error' | 'info' | 'success';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  time: number;
}

interface ToastContext {
  toasts: Toast[];
  toast: ({ type, message, time }: { type: ToastType; message: string; time?: number }) => void;
  closeToast: (id: string) => void;
}

const DEFAULT_DISPLAY_TIME = 3;

export const toastContext = createContext<ToastContext | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<Toast[]>([]);

  const toast = ({ type, message, time }: { type: ToastType; message: string; time?: number }) => {
    const id = Math.random().toString();
    setState((prev) => [...prev, { type, message, id, time: time || DEFAULT_DISPLAY_TIME }]);

    setTimeout(
      () => setState((prev) => prev.filter((x) => x.id !== id)),
      time ? time * 1000 : DEFAULT_DISPLAY_TIME * 1000
    );
  };

  const closeToast = (id: string) => {
    setState((prev) => prev.filter((x) => x.id !== id));
  };

  return createElement(toastContext.Provider, { value: { toasts: state, toast, closeToast } }, children);
};

export const useToast = () => {
  const context = useContext(toastContext);

  // su sitais reikia kaska dariti
  const toastMock = ({ type, message, time }: { type: ToastType; message: string; time?: number }) =>
    console.log('Toast error', { type, message, time });
  const closeMock = (id: string) => console.log('Error removing toast', id);

  return { toast: context?.toast || toastMock, closeToast: context?.closeToast || closeMock };
};
