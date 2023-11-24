import { apiClient } from "./ApiClient";
import { photoPaths, profilePaths } from "@config/apiPaths";
import { ProfileResponse } from "@customTypes/api";
import {
  AddPhotoFieldValues,
  UpdateProfileData,
} from "@customTypes/componentProps";

const { addPhotoPath, updateProfilePath, fetchProfilePath } = photoPaths;
const { followPath, unfollowPath } = profilePaths;

export const executeAddPhoto = async ({
  photo,
  description,
  location,
}: AddPhotoFieldValues) => {
  const formData = new FormData();
  if (photo != null) formData.append("file", photo);
  formData.append("description", description);
  formData.append("location", location);

  return await apiClient.post(addPhotoPath, formData);
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

  return await apiClient.post(updateProfilePath, formData);
};

export const executeProfileFetching = async (
  nickname: string
): ProfileResponse => {
  return await apiClient
    .get(`${fetchProfilePath}/${nickname}`)
    .then((res) => res.data);
};

export const executeFollow = async (nickname: string) => {
  return await apiClient.post(`${followPath}/${nickname}`);
};

export const executeUnfollow = async (nickname: string) => {
  return await apiClient.post(`${unfollowPath}/${nickname}`);
};