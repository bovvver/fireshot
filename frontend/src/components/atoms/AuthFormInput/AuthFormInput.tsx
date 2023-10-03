import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { AuthFormInputProps } from "@customTypes/componentProps";

const AuthFormInput = ({
  name,
  control,
  rules,
  errors,
  label,
  type = "text",
}: AuthFormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          type={type}
          error={errors[name] ? true : false}
          label={label}
          margin="dense"
          {...field}
          helperText={errors[name] ? errors[name]?.message : ""}
        />
      )}
    />
  );
};

export default AuthFormInput;
