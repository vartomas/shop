import { ReactNode, createContext, createElement, useContext, useState } from 'react';

type ToastType = 'error' | 'info' | 'success';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContext {
  toasts: Toast[];
  toast: (type: ToastType, message: string) => void;
  removeToast: (id: string) => void;
}

export const toastContext = createContext<ToastContext | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<Toast[]>([]);

  const toast = (type: ToastType, message: string, time?: number) => {
    const id = Math.random().toString();
    setState((prev) => [...prev, { type, message, id }]);

    setTimeout(() => setState((prev) => prev.filter((x) => x.id !== id)), time ? time * 1000 : 5000);
  };

  const removeToast = (id: string) => {
    setState((prev) => prev.filter((x) => x.id !== id));
  };

  return createElement(toastContext.Provider, { value: { toasts: state, toast, removeToast } }, children);
};

export const useToast = () => {
  const context = useContext(toastContext);

  // su sitais reikia kaska dariti
  const toastMock = (type: ToastType, message: string) => console.log('Toast error', { type, message });
  const removeMock = (id: string) => console.log('Error removing toast', id);

  return { toast: context?.toast || toastMock, removeToast: context?.removeToast || removeMock };
};
