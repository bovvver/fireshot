import { AuthResponse, CommentDTO, LikeDTO, PhotoPageResponse } from "@customTypes/api";
import { apiClient } from "./ApiClient";
import { homePagePaths, commentPaths } from "@config/apiPaths";

const { displayPagePath, toggleLikePath } = homePagePaths;
const { addCommentPath } = commentPaths;

export const executeHomePagePagination = async (
  page: number
): PhotoPageResponse => {
  return await apiClient.get(`${displayPagePath}/${page}`);
};

export const executeAddingComment = async (
  comment: CommentDTO
): AuthResponse => {
  return await apiClient.post(addCommentPath, comment);
};

export const executeLikeToggle = async (
  likeDTO: LikeDTO
): AuthResponse => {
  return await apiClient.post(toggleLikePath, likeDTO);
};