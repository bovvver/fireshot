import { Container, Box, Skeleton } from "@mui/material";

const ProfileLoading = () => {
  return (
    <Container maxWidth="md">
      <Box>
        <Skeleton
          variant="circular"
          sx={{ width: "9em", height: "9em", margin: "16px 0" }}
        />
        <Skeleton variant="rectangular" sx={{ height: 70, marginBottom: 1 }} />
        <Skeleton variant="rounded" sx={{ height: 40 }} />
      </Box>
      <Box sx={{ paddingTop: 2 }}>
        <Skeleton variant="rectangular" sx={{ height: "25em" }} />
      </Box>
    </Container>
  );
};

export default ProfileLoading;
