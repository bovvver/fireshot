import { TextField, Link, Button, Box } from "@mui/material";
import useAuth from "@hooks/useAuth";

const Registration = () => {
  const { handleFormSelection } = useAuth();

  return (
    <Box
      component="form"
      sx={{ my: 3, display: "flex", flexDirection: "column" }}
    >
      <TextField required label="Login" margin="dense" />
      <TextField required label="Password" margin="dense" />
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
