type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface RequestParams {
  url: string;
  method: Method;
  params?: Record<string, string>;
  body?: any;
  formData?: boolean;
}
