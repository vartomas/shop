import { api } from './api';

export const createProduct = (formData: FormData) =>
  api.request<boolean>({
    method: 'POST',
    url: 'admin/createproduct',
    body: formData,
    formData: true,
  });

export const deleteProduct = (id: string) =>
  api.request({
    method: 'POST',
    url: 'admin/deleteproduct',
    body: { id },
  });
