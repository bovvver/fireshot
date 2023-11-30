import axios from "axios";
import { baseUrl } from "@env/environments";

/**
 * Axios instance for making HTTP requests to the backend API.
 *
 * The `apiClient` is an Axios instance configured with the base URL of the
 * backend API. It also includes an interceptor to attach the JWT token to
 * the request headers for authenticated requests, except for authentication
 * related endpoints.
 *
 * @module apiClient
 */
export const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
