import { useState } from "react";
import { Box } from "@mui/material";
import {
  BoxWrapper,
  StyledPaper,
  ButtonWrapper,
  EditButton,
} from "./ProfileHeaderForm.styles";
import UpdateProfileTextField from "@components/atoms/UpdateProfileTextField/UpdateProfileTextField";
import AddImageButton from "@components/atoms/AddImageButton/AddImageButton";
import ProfileStats from "../ProfileStats/ProfileStats";
import {
  ProfileHeaderFormProps,
  UpdateProfileData,
} from "@customTypes/componentProps";
import { useForm } from "react-hook-form";
import { useToast } from "@hooks/contextHooks";
import { executeProfileUpdate } from "@api/ProfileService";

const ProfileHeaderForm = ({ handleEditChange }: ProfileHeaderFormProps) => {
  const [avatar, setAvatar] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const { handleToastOpening } = useToast();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateProfileData>({
    defaultValues: {
      photo: null,
      nickname: "",
      description: "",
    },
  });

  const onSubmit = async (data: UpdateProfileData) => {
    data.photo = selectedPhoto;

    try {
      await executeProfileUpdate(data);
      handleToastOpening("Profile updated.", "success");
      handleEditChange();
    } catch (e) {
      handleToastOpening(
        "Error while updating profile. Please try again.",
        "error"
      );
    }

    reset();
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <BoxWrapper>
          <StyledPaper avatar={avatar}>
            <AddImageButton
              setBackground={setAvatar}
              setImage={setSelectedPhoto}
            />
          </StyledPaper>
          <ProfileStats />
        </BoxWrapper>

        <UpdateProfileTextField
          name="nickname"
          control={control}
          rules={{
            maxLength: {
              value: 30,
              message: "Maximum 30 characters",
            },
          }}
          errors={errors}
          label="Nickname"
          placeholder="Your new nickname"
        />

        <UpdateProfileTextField
          name="description"
          control={control}
          rules={{
            maxLength: {
              value: 500,
              message: "Maximum 500 characters",
            },
          }}
          errors={errors}
          label="Description"
          placeholder="Tell your friends about yourself"
          multiline={true}
          rows={3}
        />

        <ButtonWrapper>
          <EditButton variant="outlined" onClick={handleEditChange}>
            Cancel
          </EditButton>
          <EditButton type="submit" variant="contained">
            Save
          </EditButton>
        </ButtonWrapper>
      </form>
    </Box>
  );
};

export default ProfileHeaderForm;
