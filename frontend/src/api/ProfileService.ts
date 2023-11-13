import { apiClient } from "./ApiClient";
import { photoPaths } from "@config/apiPaths";
import { AddPhotoFieldValues, UpdateProfileData } from "@customTypes/componentProps";

const { addPhotoPath, updateProfilePath } = photoPaths;

export const executeAddPhoto = async ({
  photo,
  description,
  location,
}: AddPhotoFieldValues) => {
  const formData = new FormData();
  if (photo != null) formData.append("file", photo);
  formData.append("description", description);
  formData.append("location", location);

  return await apiClient.post(addPhotoPath, formData, {
    withCredentials: true,
  });
};

export const executeProfileUpdate = async ({
  photo,
  nickname,
  description,
}: UpdateProfileData) => {
  const formData = new FormData();
  if (photo != null) formData.append("file", photo);
  formData.append("nickname", nickname);
  formData.append("description", description);

  return await apiClient.post(updateProfilePath, formData, {
    withCredentials: true,
  });
};
