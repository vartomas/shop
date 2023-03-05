import { RequestParams } from '@/types/apiModel';

export const baseUrl = process.env.BASE_URL;

const createParamsString = (params: Record<string, string> | undefined) =>
  params &&
  `?${Object.keys(params)
    .map((x) => x + '=' + params[x])
    .join('&')}`;

export const api = {
  get: (url: string, params: Record<string, string> | undefined) =>
    fetch(url + (params && createParamsString(params)), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  request: (props: RequestParams) =>
    fetch(props.url + (props.params && createParamsString(props.params)), {
      method: props.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: props.body,
    }),
};
