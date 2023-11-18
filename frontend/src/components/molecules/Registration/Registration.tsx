import { Link, Button } from "@mui/material";
import { useAuth } from "@hooks/contextHooks";
import { useForm, Control } from "react-hook-form";
import { RegistrationRequestData } from "@customTypes/api";
import CustomTextField from "@components/atoms/CustomTextField/CustomTextField";
import { CustomTextFieldValues } from "@customTypes/componentProps";
import { BoxWrapper } from "./Registration.styles";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,}$/;

const Registration = () => {
  const { handleFormSelection, handleRegistration } = useAuth();
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (data: RegistrationRequestData) => {
    handleRegistration(data);
    reset();
  };

  const switchToRegistration = () => {
    handleFormSelection(true);
  };

  const validatePasswords = (val: string) => {
    if (watch("password") !== val) {
      return "Passwords don't match.";
    }
  };

  return (
    <BoxWrapper component="form" onSubmit={handleSubmit(onSubmit)}>
      <CustomTextField
        name="email"
        control={control as Control<CustomTextFieldValues>}
        rules={{
          required: "Required",
          pattern: { value: emailRegex, message: "Invalid e-mail" },
        }}
        errors={errors}
        label="E-mail"
      />

      <CustomTextField
        name="nickname"
        control={control as Control<CustomTextFieldValues>}
        rules={{
          required: "Required",
        }}
        errors={errors}
        label="Username"
      />

      <CustomTextField
        name="password"
        control={control as Control<CustomTextFieldValues>}
        rules={{
          required: "Required",
          minLength: { value: 6, message: "Minimum 6 characters" },
          maxLength: { value: 30, message: "Maximum 30 characters" },
          pattern: { value: passwordRegex, message: "Password is too weak" },
        }}
        errors={errors}
        label="Password"
        type="password"
      />

      <CustomTextField
        name="confirmPassword"
        control={control as Control<CustomTextFieldValues>}
        rules={{
          required: "Required",
          pattern: passwordRegex,
          validate: validatePasswords,
        }}
        errors={errors}
        label="Confirm password"
        type="password"
      />

      <Button size="large" type="submit" variant="contained" sx={{ my: 2 }}>
        Create account
      </Button>
      <Link underline="hover" component="button" onClick={switchToRegistration}>
        Already have an account?
      </Link>
    </BoxWrapper>
  );
};

export default Registration;
