export interface HttpResponse<T = unknown> {
  data: T;
  ok: boolean;
  status: number;
}

export interface ErrorResponse {
  status: number;
  message: string;
}

export interface HttpData {
  key: string;
  value: string | string[];
}

export interface Request<T> extends Promise<HttpResponse<T>> {
  cancel?: () => void;
}
