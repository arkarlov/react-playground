import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosInterceptorOptions,
  AxiosError,
} from "axios";

type onFulfilledCallback<T> = (value: T) => T | Promise<T>;
type onRejectedCallback = (error: AxiosError) => unknown;

type Interceptor<T> = {
  onFulfilled?: onFulfilledCallback<T> | null;
  onRejected?: onRejectedCallback | null;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
} & (T extends AxiosResponse ? {} : { options?: AxiosInterceptorOptions });

export type RequestInterceptor = Interceptor<InternalAxiosRequestConfig>;
export type ResponseInterceptor = Interceptor<AxiosResponse>;
