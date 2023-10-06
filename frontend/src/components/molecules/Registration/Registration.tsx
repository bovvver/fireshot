import { Link, Button, Box } from "@mui/material";
import useAuth from "@hooks/useAuth";
import { useForm, Control } from "react-hook-form";
import { LoginDTO } from "@customTypes/auth";
import AuthFormInput from "@components/atoms/AuthFormInput/AuthFormInput";
import { FieldValues } from "@customTypes/componentProps";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,}$/;

const Registration = () => {
  const { handleFormSelection } = useAuth();
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (data: LoginDTO) => {
    console.log(data);
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ my: 3, display: "flex", flexDirection: "column" }}
    >
      <AuthFormInput
        name="email"
        control={control as Control<FieldValues>}
        rules={{
          required: "Required",
          pattern: { value: emailRegex, message: "Invalid e-mail" },
        }}
        errors={errors}
        label="E-mail"
      />

      <AuthFormInput
        name="username"
        control={control as Control<FieldValues>}
        rules={{
          required: "Required",
        }}
        errors={errors}
        label="Username"
      />

      <AuthFormInput
        name="password"
        control={control as Control<FieldValues>}
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

      <AuthFormInput
        name="confirmPassword"
        control={control as Control<FieldValues>}
        rules={{
          required: "Required",
          pattern: passwordRegex,
          validate: (val: string) => {
            if (watch("password") !== val) {
              return "Passwords don't match.";
            }
          },
        }}
        errors={errors}
        label="Confirm password"
        type="password"
      />

      <Button size="large" type="submit" variant="contained" sx={{ my: 2 }}>
        Login
      </Button>
      <Link
        underline="hover"
        component="button"
        onClick={() => handleFormSelection(true)}
      >
        Already have an account?
      </Link>
    </Box>
  );
};

export default Registration;
