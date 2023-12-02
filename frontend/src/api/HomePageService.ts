import { AuthResponse, CommentDTO, PhotoPageResponse } from "@customTypes/api";
import { apiClient } from "./ApiClient";
import { homePagePaths, commentPaths } from "@config/apiPaths";

const { displayPagePath } = homePagePaths;
const { addComment } = commentPaths;

export const executeHomePagePagination = async (
  page: number
): PhotoPageResponse => {
  return await apiClient.get(`${displayPagePath}/${page}`);
};

export const executeAddingComment = async (
  comment: CommentDTO
): AuthResponse => {
  return await apiClient.post(addComment, comment);
};
