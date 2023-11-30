import { Control, FieldErrors, FieldValues } from "react-hook-form";
import { SearchResponse, UserData } from "./api";

export interface CustomTextFieldValues {
  email: string;
  nickname?: string;
  password: string;
  confirmPassword?: string;
}

export interface AddPhotoFieldValues {
  photo: File | null;
  description: string;
  location: string;
}

export interface UpdateProfileData {
  photo: File | null;
  nickname: string;
  description: string;
}

export interface CustomTextFieldProps {
  name: keyof CustomTextFieldValues;
  control: Control<CustomTextFieldValues>;
  rules: object;
  errors: FieldErrors<CustomTextFieldValues>;
  label: string;
  type?: string;
}

export interface AddPhotoTextFieldProps<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  rules: object;
  errors: FieldErrors<T>;
  label: string;
  placeholder: string;
  multiline?: boolean;
  rows?: number;
}

export interface AvatarUserField {
  onClick: () => void;
  username: string;
  src?: string;
  location?: string;
}

export interface ProfileStatInterface {
  counter: number;
  title: string;
}

export interface ProfileStatLinkInterface {
  counter: number;
  title: string;
  onClick: () => void;
}

export interface BackButtonInterface {
  onClick: () => void;
  value: string;
}

export interface ProfileHeaderInterface {
  profileData: UserData | null;
  loggedUserAccount: boolean;
}

export interface AddImageButtonInterface {
  setImage: (image: File | null) => void;
  setBackground: (image: string) => void;
}

export interface ProfileHeaderFormProps {
  handleEditChange: () => void;
}

export interface ProfileStatsProps {
  posts: number;
  followers: number;
  following: number;
  nickname: string;
}

export type SearchFunction = (
  searchInput: string,
  targetUserNickname?: string
) => SearchResponse;

export type ModalFunctionProps = "followers" | "following";
