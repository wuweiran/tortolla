import { apiGet, apiPost } from "./api.ts";

export type Post = {
  postId: number;
  title: string;
  body: string;
};

export const listTopPostIds = () => apiGet<number[]>("/posts/list-top", {limit: 8});

export type CreatePostRequest = {
  title: string;
  body: string;
};

export type CreatePostResponse = {
  id: number;
  title: string;
  body: string;
  createdTime: Date;
};

export const createPost = (request: CreatePostRequest) =>
  apiPost<CreatePostRequest, CreatePostResponse>("/post/create", request);
