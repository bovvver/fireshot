import { AxiosHeaders } from "axios";

// == AXIOS ==

export interface LoginRequestData {
  email: string;
  password: string;
}

export interface RegistrationRequestData {
  email: string;
  nickname: string;
  password: string;
  confirmPassword?: string;
}

export interface ApiResponseData<T> {
  data: T;
  status: number;
  statusText: string;
  config: Record<string, unknown>;
  headers: AxiosHeaders;
  request: XMLHttpRequest;
}

// export type AuthRequestResponse = Promise<ApiResponseData<ResponseDTO>>;


export type AuthRequestResponse = Promise<ApiResponseData<ResponseDTO>>;

// == DTO ==

export interface ResponseDTO {
  status: number;
  message: string;
  body?: LoginDTO;
}

export interface LoginDTO {
  nickname: string;
  accessToken: string;
}
