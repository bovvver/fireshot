import { apiClient } from "./ApiClient";
import { photoPaths, profilePaths, searchPaths } from "@config/apiPaths";
import { ProfileResponse, SearchResponse } from "@customTypes/api";
import {
  AddPhotoFieldValues,
  UpdateProfileData,
} from "@customTypes/componentProps";

const { addPhotoPath, updateProfilePath, fetchProfilePath } = photoPaths;
const { followPath, unfollowPath } = profilePaths;
const { defaultSearchPath } = searchPaths;

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

export const executeAllUsersSearch = async (
  searchInput: string
): SearchResponse => {
  return await apiClient.get(`${defaultSearchPath}/${searchInput}`);
};

export const executeUserFollowersSearch = async (
  nickname: string,
  searchInput: string
): SearchResponse => {
  return await apiClient.get(
    `${defaultSearchPath}/${nickname}/followers/${searchInput}`
  );
};

export const executeUserFollowingSearch = async (
  nickname: string,
  searchInput: string
): SearchResponse => {
  return await apiClient.get(
    `${defaultSearchPath}/${nickname}/following/${searchInput}`
  );
};
