import { AnObject, HttpResponse, Request } from '../../types';

interface QueryProps {
  method?: 'get' | 'post' | 'delete' | 'put' | 'options';
  url: string;
  payload?: unknown;
}

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

export const getHeaders = (): AnObject => {
  return { ...DEFAULT_HEADERS };
};

export const getResponseJson = <T>(response: Response): Promise<HttpResponse<T>> => {
  const { status, ok } = response;
  if (response.headers.get('Content-Length') === '0') {
    return Promise.resolve({
      data: {} as T,
      status,
      ok,
    });
  }
  const responseData = response.json();
  return responseData.then((data: T) => {
    return {
      data,
      status,
      ok,
    };
  });
};

export const validateResponse = <T = unknown>(data: HttpResponse<T>): HttpResponse<T> => {
  const { ok } = data;
  if (!ok) {
    throw new Error(`--response-- ${JSON.stringify(data)}`);
  }
  return data;
};

export default function http<T = unknown>({ method = 'get', url, payload }: QueryProps): Request<T> {
  const controller = new AbortController();
  const { signal } = controller;
  let body;

  try {
    body = JSON.stringify(payload);
  } catch (e) {
    return Promise.reject(e);
  }

  const request = fetch(`${process.env.BASE_URL || ''}${url}`, {
    method,
    headers: getHeaders(),
    body,
    signal,
  })
    .then((response) => getResponseJson<T>(response))
    .then((data) => validateResponse<T>(data));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Unreachable code error
  request.cancel = () => controller.abort();

  return request;
}
