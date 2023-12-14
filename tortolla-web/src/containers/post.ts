import { apiGet, apiPost } from "./api.ts";
import { UserBasicInfo } from "./user.ts";

export type PostPreview = {
  id: number;
  title: string;
  author: UserBasicInfo;
  createdTime: string;
  lastUpdatedTime: string;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  author: UserBasicInfo;
  createdTime: string;
  lastUpdatedTime: string;
};

export const getPost = (postId: number) => apiGet<Post>(`/post/${postId}`);

export const listLatestPosts = (pageNumber: number, pageSize: number) =>
  apiGet<PostPreview[]>("/post/latest", {
    pageNumber: pageNumber,
    pageSize: pageSize,
  });

export type CreatePostRequest = {
  title: string;
  body: string;
};

export const createPost = (request: CreatePostRequest) =>
  apiPost<CreatePostRequest, number>("/post/create", request);

export type DeletePostRequest = {
  postId: number;
};

export const deletePost = (request: DeletePostRequest) =>
  apiPost<DeletePostRequest, void>("/post/delete", request);
