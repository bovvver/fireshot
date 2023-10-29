import { Control, FieldErrors } from "react-hook-form";

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

export interface CustomTextFieldProps {
  name: keyof CustomTextFieldValues;
  control: Control<CustomTextFieldValues>;
  rules: object;
  errors: FieldErrors<CustomTextFieldValues>;
  label: string;
  type?: string;
}

export interface AddPhotoTextFieldProps {
  name: keyof AddPhotoFieldValues;
  control: Control<AddPhotoFieldValues>;
  rules: object;
  errors: FieldErrors<AddPhotoFieldValues>;
  label: string;
  placeholder: string;
  multiline?: boolean;
  rows?: number;
}

export interface AvatarUserField {
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
  loggedUserAccount: boolean;
}

export interface AddImageButtonInterface {
  setImage: (image: File | null) => void;
  setBackground: (image: string) => void;
}

export interface AddPhotoData {
  photo: File | null,
  description: string,
  location: string,
}