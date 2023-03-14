import { UpdateProductRequest } from '@/types/productModel';
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

export const updateProduct = (props: UpdateProductRequest) =>
  api.request({
    method: 'POST',
    url: 'admin/updateproduct',
    params: { id: props.id },
    body: props.data,
    formData: true,
  });
