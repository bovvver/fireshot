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
import {
  ProfileHeaderFormProps,
  UpdateProfileData,
} from "@customTypes/componentProps";
import { useForm } from "react-hook-form";
import { useToast, useAuth } from "@hooks/contextHooks";
import { executeProfileUpdate } from "@api/ProfileService";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { ROOT_PATH } from "@config/routes";

const ProfileHeaderForm = ({ handleEditChange }: ProfileHeaderFormProps) => {
  const [avatar, setAvatar] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const { handleToastOpening } = useToast();
  const { handleUserChange } = useAuth();
  const navigate = useNavigate();
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

  const correctPath = ({ nickname, description }: UpdateProfileData) => {
    if (nickname === "" && description === "") return;

    if (nickname !== "") {
      setNicknameCookie(nickname);
      handleUserChange(nickname);
    }

    navigate(ROOT_PATH);
  };

  const setNicknameCookie = (nickname: string) => {
    new Cookies().set("nickname", nickname, { path: ROOT_PATH });
  };

  const onSubmit = async (data: UpdateProfileData) => {
    data.photo = selectedPhoto;

    try {
      await executeProfileUpdate(data);
      correctPath(data);

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
