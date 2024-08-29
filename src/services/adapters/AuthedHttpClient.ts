import { type CreateAxiosDefaults } from "axios";

import { clearSession } from "../auth";
import { HttpClient } from "./HttpClient";

export class AuthedHttpClient extends HttpClient {
  constructor(options?: CreateAxiosDefaults) {
    super(options);

    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  private handleUnauthorized() {
    clearSession();
    window.location.replace("/login");
  }

  private _initializeRequestInterceptor() {
    this.client.interceptors.request.use(
      async (config) => {
        const token = localStorage.getItem("token");

        if (!token) {
          this.handleUnauthorized();
        }

        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  private _initializeResponseInterceptor() {
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.handleUnauthorized();
        }

        return Promise.reject(error);
      },
    );
  }
}
