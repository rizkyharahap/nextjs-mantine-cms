import dayjs from "dayjs";

import { sleep } from "@/utilities/sleep";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: any;
  name: any;
  expired_at: string;
  token: string;
}

export async function login(payload: LoginPayload) {
  await sleep();

  const result: LoginResponse = {
    email: payload.email,
    name: "John Doe",
    expired_at: dayjs(new Date()).add(30, "minutes").toISOString(),
    token: "mock-token",
  };

  return Promise.resolve(result);
}

export async function logout() {
  await sleep();
  return Promise.resolve();
}

export function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("expired_at");
  localStorage.removeItem("profile");
}

export function checkSession() {
  const token = localStorage.getItem("token");
  const expiredAtStr = localStorage.getItem("expired_at");

  if (!token || !expiredAtStr) {
    return false;
  }

  const expiretAt = new Date(expiredAtStr);

  if (isNaN(expiretAt.getTime()) || Date.now() >= expiretAt.getTime()) {
    return false;
  }

  return true;
}
