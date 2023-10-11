import { SyntheticEvent, useState } from "react";
import { TextField, Button, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import AddImageButton from "@components/atoms/AddImageButton/AddImageButton";
import {
  ContainerWrapper,
  TabListWrapper,
  SelectImagePaper,
  StyledTabPanel,
} from "./AddPhoto.styles";

function App() {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [currentTab, setCurrentTab] = useState("0");

  const handleTabChange = (_e: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  return (
    <ContainerWrapper>
      <TabContext value={currentTab}>
        <TabListWrapper>
          <TabList onChange={handleTabChange} sx={{ display: "flex" }}>
            <Tab sx={{ flex: 1 }} label="Choose photo" value="0" />
            <Tab
              sx={{ flex: 1 }}
              label="Add description"
              value="1"
              disabled={backgroundImage === ""}
            />
          </TabList>
        </TabListWrapper>
        <StyledTabPanel currentTab={currentTab} value="0">
          <SelectImagePaper backgroundImage={backgroundImage}>
            <AddImageButton setImage={setBackgroundImage} />
          </SelectImagePaper>
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
        </StyledTabPanel>
        <StyledTabPanel currentTab={currentTab} value="1">
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
        </StyledTabPanel>
      </TabContext>
    </ContainerWrapper>
  );
}

export default App;
