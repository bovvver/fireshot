import { SyntheticEvent, useState } from "react";
import { Container, Paper, TextField, Button, Box, Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import colors from "@styles/colorTheme";
import AddImageButton from "@components/atoms/AddImageButton/AddImageButton";

function App() {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [currentTab, setCurrentTab] = useState("0");

  const handleTabChange = (_e: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
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
            <AddImageButton setImage={setBackgroundImage} />
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
