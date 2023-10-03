import { Control, FieldErrors } from "react-hook-form";

export interface FieldValues {
  email: string;
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
