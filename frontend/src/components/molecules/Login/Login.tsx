import { Link, Button, Box } from "@mui/material";
import { useAuth } from "@hooks/contextHooks";
import { useForm } from "react-hook-form";
import { LoginRequestData } from "@customTypes/api";
import CustomTextField from "@components/atoms/CustomTextField/CustomTextField";

const Login = () => {
  const { handleFormSelection, handleLogin } = useAuth();
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

  const onSubmit = (data: LoginRequestData) => {
    handleLogin(data);
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ my: 3, display: "flex", flexDirection: "column" }}
    >
      <CustomTextField
        name="email"
        control={control}
        rules={{
          required: "Required",
        }}
        errors={errors}
        label="E-mail"
      />
      <CustomTextField
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
