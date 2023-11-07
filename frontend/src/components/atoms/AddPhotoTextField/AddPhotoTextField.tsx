import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { AddPhotoTextFieldProps } from "@customTypes/componentProps";

const AddPhotoTextField = ({
  name,
  control,
  rules,
  errors,
  label,
  placeholder,
  multiline = false,
  rows = 1,
}: AddPhotoTextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
        fullWidth
        placeholder={placeholder}
          sx={{ mt: 2, maxWidth: { xs: "40vh", sm: "50vh" } }}
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

export default AddPhotoTextField;
