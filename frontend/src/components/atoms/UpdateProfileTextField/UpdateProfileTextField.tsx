import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { AddPhotoTextFieldProps,UpdateProfileData } from "@customTypes/componentProps";

const UpdateProfileTextField = ({
  name,
  control,
  rules,
  errors,
  label,
  placeholder,
  multiline = false,
  rows = 1,
}: AddPhotoTextFieldProps<UpdateProfileData>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          fullWidth
          placeholder={placeholder}
          multiline={multiline}
          rows={rows}
          type="text"
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

export default UpdateProfileTextField;
