import { Control, FieldErrors, FieldValues } from "react-hook-form";

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

export interface ProfileHeaderFormProps {
  handleEditChange: () => void;
}
