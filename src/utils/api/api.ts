import { RequestParams } from '@/types/apiModel';

export const baseUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/' : 'https://localghost.lt/api/';

const createParamsString = (params: Record<string, string> | undefined) =>
  params &&
  `?${Object.keys(params)
    .map((x) => x + '=' + params[x])
    .join('&')}`;

export const api = {
  get: async <T>({ url, params }: { url: string; params?: Record<string, string> | undefined }) => {
    try {
      const response = await fetch(baseUrl + url + (params ? createParamsString(params) : ''), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return { data: (await response.json()) as T, error: null };
    } catch (error) {
      return { data: null, error: error };
    }
  },
  request: async <T>(props: RequestParams): Promise<{ data: T | null; error: unknown }> => {
    try {
      const response = await fetch(baseUrl + props.url + (props.params ? createParamsString(props.params) : ''), {
        method: props.method,
        headers: props.formData
          ? undefined
          : {
              'Content-Type': 'application/json',
            },
        body: props.formData ? props.body : JSON.stringify(props.body),
      });
      return { data: (await response.json()) as T, error: null };
    } catch (error) {
      return { data: null, error: error };
    }
  },
};
