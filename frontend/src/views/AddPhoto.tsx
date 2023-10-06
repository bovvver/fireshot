import { ChangeEvent, useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import colors from "@styles/colorTheme";
import useToast from "@hooks/useToast";

function App() {
  const [backgroundImage, setBackgroundImage] = useState<string>();
  const { handleToastOpening } = useToast();

  const getFileType = (file: string | undefined) => {
    if (file === undefined || file === null) return null;
    return file.split(":")[1].split(";")[0];
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const result = getFileType(event.target.result?.toString());

          if (result === null || !result.includes("image")) {
            handleToastOpening("Please, select image file.", "warning"); // TODO ERROR POPUP
            return;
          }
          setBackgroundImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          mt: 2,
          position: "relative",
          width: "100%",
          maxWidth: "40vh",
          aspectRatio: "1/1",
          maxHeight: "40vh",
          backgroundColor: colors.selectGray,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <input
          type="file"
          accept="image/*"
          id="image-upload"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <IconButton
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
          component="label"
          htmlFor="image-upload"
        >
          <AddIcon
            sx={{
              fontSize: "5rem",
            }}
          />
        </IconButton>
      </Paper>
      <TextField
        sx={{ mt: 2, maxWidth: { xs: "40vh", sm: "50vh" } }}
        fullWidth
        label="Description"
        placeholder="Tell us something about this picture..."
        multiline
        rows={4}
      />
      <TextField
        sx={{ mt: 2, maxWidth: { xs: "40vh", sm: "50vh" } }}
        fullWidth
        label="Location"
        placeholder="Where was this picture taken?"
      />
      <Button
        sx={{ mt: 2, maxWidth: { xs: "40vh", sm: "50vh" } }}
        size="large"
        fullWidth
        variant="outlined"
      >
        add photo
      </Button>
    </Container>
  );
}

export default App;
