import {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

import type { ErrorResponse } from "./ApiSchema";

export class ApiError<T> extends AxiosError<T> {
  constructor(error?: {
    message?: string;
    code?: string;
    config?: InternalAxiosRequestConfig<T>;
    request?: T;
    response?: AxiosResponse<T>;
  }) {
    super(
      "ApiError",
      error?.code,
      error?.config,
      error?.request,
      error?.response,
    );
  }

  getMessage(
    defaultErrorMessage = "Oops, sepertinya ada yang salah tunggu beberapa saat lagi!",
  ) {
    const errorRes = (this.response?.data as ErrorResponse)?.data;

    if (!errorRes?.message) return defaultErrorMessage;

    return errorRes.message;
  }
}
