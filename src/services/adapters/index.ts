import { AuthedHttpClient } from "./AuthedHttpClient";
import { HttpClient } from "./HttpClient";

export const httpClient = new HttpClient();
export const authedHttpClient = new AuthedHttpClient();
