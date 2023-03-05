export type ToastType = 'error' | 'info' | 'success';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  time: number;
}
