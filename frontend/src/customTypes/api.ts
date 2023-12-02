import { AxiosHeaders } from "axios";
import { Comment } from "./componentProps";

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

export type SearchResponse = Promise<ApiResponseData<ResponseDTO<string[]>>>;

export interface Photo {
  id: number;
  source: string;
  description: string;
  location: string;
  comments: Comment[];
  likes: number;
  date: string;
  owner: string;
}

export interface PhotoPage {
  content: Photo[];
  pageable: Record<string, unknown>;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Record<string, unknown>;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export type PhotoPageResponse = Promise<
  ApiResponseData<ResponseDTO<PhotoPage>>
>;

export interface CommentDTO {
  photoId: number;
  content: string;
}
