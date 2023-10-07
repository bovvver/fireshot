import { Control, FieldErrors } from "react-hook-form";

export interface FieldValues {
  email: string;
  username?: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthFormInputProps {
  name: keyof FieldValues;
  control: Control<FieldValues>;
  rules: object;
  errors: FieldErrors<FieldValues>;
  label: string;
  type?: string;
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
