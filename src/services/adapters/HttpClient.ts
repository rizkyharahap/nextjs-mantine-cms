import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults,
} from "axios";

import { API_URL } from "@/constants/configs";

/**
 * HttpClient for communication with API
 * @constructor {AxiosInstance} options . Http options
 */
export class HttpClient {
  private _baseUrl: string;
  protected client: AxiosInstance;

  constructor(options?: CreateAxiosDefaults) {
    this.client = axios.create(options);
    this._baseUrl = options?.baseURL ?? API_URL ?? "";
  }

  private createUrl(baseUrl: string, path: string): string {
    return baseUrl + path;
  }

  async get<T>(
    path: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const url = this.createUrl(config?.baseURL ?? this._baseUrl, path);
    const response = await this.client.get<T>(url, config);

    return response;
  }

  post<T>(
    path: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const url = this.createUrl(config?.baseURL ?? this._baseUrl, path);
    return this.client.post(url, data, config);
  }

  put<T>(
    path: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const url = this.createUrl(config?.baseURL ?? this._baseUrl, path);
    return this.client.put(url, data, config);
  }

  patch<T>(
    path: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const url = this.createUrl(config?.baseURL ?? this._baseUrl, path);
    return this.client.patch(url, data, config);
  }

  delete<T>(
    path: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const url = this.createUrl(config?.baseURL ?? this._baseUrl, path);
    return this.client.delete(url, config);
  }
}
