import { api } from './api';

export const createProduct = (formData: FormData) =>
  api.request<boolean>({
    method: 'POST',
    url: 'admin/createproduct',
    body: formData,
    formData: true,
  });
