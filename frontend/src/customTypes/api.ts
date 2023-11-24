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

export type AuthResponse = Promise<ApiResponseData<ResponseDTO<unknown>>>;

// == DTO ==

export interface ResponseDTO<T> {
  status: number;
  message: string;
  body?: T;
}

export interface UserData {
  id: number;
  email: string;
  nickname: string;
  description: string;
  photos: string[];
  followers: number;
  following: number;
  followed: boolean;
}

export type ProfileResponse = Promise<ResponseDTO<UserData>>;
