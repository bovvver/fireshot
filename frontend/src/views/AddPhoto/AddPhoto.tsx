import { SyntheticEvent, useState } from "react";
import { Button, Tab, Container } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import AddImageButton from "@components/atoms/AddImageButton/AddImageButton";
import {
  BoxWrapper,
  TabListWrapper,
  SelectImagePaper,
  StyledTabPanel,
} from "./AddPhoto.styles";
import AddPhotoTextField from "@components/atoms/AddPhotoTextField/AddPhotoTextField";
import { useForm } from "react-hook-form";
import { AddPhotoFieldValues } from "@customTypes/componentProps";
import { executeAddPhoto } from "@api/ProfileService";
import { useToast } from "@hooks/contextHooks";
import { useNavigate } from "react-router-dom";
import { ROOT_PATH } from "@config/routes";

const AddPhoto = () => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [currentTab, setCurrentTab] = useState("0");
  const { handleToastOpening } = useToast();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AddPhotoFieldValues>({
    defaultValues: {
      photo: null,
      description: "",
      location: "",
    },
  });
  const navigate = useNavigate();

  const handleTabChange = (_e: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const onSubmit = async (data: AddPhotoFieldValues) => {
    if (selectedPhoto != null) {
      data.photo = selectedPhoto;

      try {
        await executeAddPhoto(data);
        handleToastOpening("Photo added.", "success");
        navigate(ROOT_PATH);
      } catch (e) {
        handleToastOpening(
          "Error when uploading a photo. Please try again.",
          "error"
        );
      }
    } else {
      handleToastOpening("Select a photo.", "warning");
    }

    reset();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <BoxWrapper>
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
            <StyledTabPanel currenttab={currentTab} value="0">
              <SelectImagePaper backgroundimage={backgroundImage}>
                <AddImageButton
                  setBackground={setBackgroundImage}
                  setImage={setSelectedPhoto}
                />
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
            <StyledTabPanel currenttab={currentTab} value="1">
              <AddPhotoTextField
                name="description"
                control={control}
                rules={{
                  maxLength: {
                    value: 1000,
                    message: "Maximum 1000 characters",
                  },
                }}
                errors={errors}
                label="Description"
                placeholder="Tell us something about this picture..."
                multiline={true}
                rows={8}
              />

              <AddPhotoTextField
                name="location"
                control={control}
                rules={{
                  maxLength: { value: 40, message: "Maximum 40 characters" },
                }}
                errors={errors}
                label="Location"
                placeholder="Where was this picture taken?"
              />

              <Button
                type="submit"
                sx={{ mt: 2, maxWidth: { xs: "40vh", sm: "50vh" } }}
                size="large"
                fullWidth
                variant="outlined"
              >
                add photo
              </Button>
            </StyledTabPanel>
          </TabContext>
        </BoxWrapper>
      </form>
    </Container>
  );
};

export default AddPhoto;
