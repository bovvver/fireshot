import { Link, Button, Box } from "@mui/material";
import useAuth from "@hooks/useAuth";
import { useForm } from "react-hook-form";
import { LoginDTO } from "@customTypes/auth";
import AuthFormInput from "@components/atoms/AuthFormInput/AuthFormInput";

const Login = () => {
  const { handleFormSelection } = useAuth();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
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
        control={control}
        rules={{
          required: "Required",
        }}
        errors={errors}
        label="E-mail"
      />
      <AuthFormInput
        name="password"
        type="password"
        control={control}
        rules={{
          required: "Required",
        }}
        errors={errors}
        label="Password"
      />
      <Button size="large" type="submit" variant="contained" sx={{ my: 2 }}>
        Login
      </Button>
      <Link
        underline="hover"
        component="button"
        onClick={() => handleFormSelection(false)}
      >
        Don't have an account?
      </Link>
    </Box>
  );
};

export default Login;
