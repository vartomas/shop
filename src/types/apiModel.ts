type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface RequestParams {
  url: string;
  method: Method;
  body?: any;
  params?: Record<string, string>;
}

export interface LoginResponse {
  email: string;
}
