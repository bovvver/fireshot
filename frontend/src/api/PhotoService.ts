import { apiClient } from "./ApiClient";
import { photoPaths } from "@config/apiPaths";
import { AddPhotoData } from "@customTypes/componentProps";

const { addPhotoPath } = photoPaths;

export const executeAddPhoto = async ({
  photo,
  description,
  location,
}: AddPhotoData) => {
  const formData = new FormData();
  if (photo != null) formData.append("file", photo);
  formData.append("description", description);
  formData.append("location", location);

  return await apiClient.post(addPhotoPath, formData, {
    withCredentials: true,
  });
};
