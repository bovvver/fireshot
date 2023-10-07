import { SyntheticEvent, ChangeEvent, useState } from "react";
import {
  Container,
  Paper,
  IconButton,
  TextField,
  Button,
  Box,
  Tab,
} from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import colors from "@styles/colorTheme";
import useToast from "@hooks/useToast";

function App() {
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [currentTab, setCurrentTab] = useState("0");
  const { handleToastOpening } = useToast();

  const handleTabChange = (_e: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

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
            handleToastOpening("Please, select image file.", "warning");
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
      <TabContext value={currentTab}>
        <Box
          sx={{
            width: "100%",
            borderBottom: 1,
            borderColor: "divider",
            maxWidth: "60vh",
          }}
        >
          <TabList onChange={handleTabChange} sx={{ display: "flex" }}>
            <Tab sx={{ flex: 1 }} label="Choose photo" value="0" />
            <Tab
              sx={{ flex: 1 }}
              label="Add description"
              value="1"
              disabled={backgroundImage === ""}
            />
          </TabList>
        </Box>
        <TabPanel
          sx={{
            width: "100%",
            display: currentTab === "0" ? "flex" : "none",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          value="0"
        >
          <Paper
            sx={{
              mt: 2,
              position: "relative",
              width: "100%",
              maxWidth: "70vh",
              aspectRatio: "1/1",
              maxHeight: "70vh",
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
          <Button
            sx={{
              mt: 2,
              maxWidth: "70vh",
            }}
            fullWidth
            size="large"
            variant="outlined"
            disabled={backgroundImage === ""}
            onClick={() => {
              setCurrentTab("1");
            }}
          >
            next
          </Button>
        </TabPanel>
        <TabPanel
          value="1"
          sx={{
            width: "100%",
            display: currentTab === "1" ? "flex" : "none",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ mt: 2, maxWidth: { xs: "40vh", sm: "50vh" } }}
            fullWidth
            label="Description"
            placeholder="Tell us something about this picture..."
            multiline
            rows={8}
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
        </TabPanel>
      </TabContext>
    </Container>
  );
}

export default App;
