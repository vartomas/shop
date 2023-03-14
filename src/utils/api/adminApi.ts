import { UpdateProductRequest } from '@/types/productModel';
import { api } from './api';

export const createProduct = (formData: FormData) =>
  api.request<boolean>({
    url: 'admin/createproduct',
    body: formData,
    formData: true,
  });

export const deleteProduct = (id: string) =>
  api.request({
    url: 'admin/deleteproduct',
    body: { id },
  });

export const updateProduct = (props: UpdateProductRequest) =>
  api.request({
    url: 'admin/updateproduct',
    params: { id: props.id },
    body: props.data,
    formData: true,
  });

export const makeAdmin = (id: string, value: boolean) =>
  api.request({
    url: 'admin/makeadmin',
    params: { id },
    body: { value },
  });
