import { apiGet, apiPost } from "./api.ts";
import { UserBasicInfo } from "./user.ts";

export type Post = {
  id: number;
  title: string;
  body: string;
  author: UserBasicInfo;
  createdTime: Date;
  lastUpdatedTime: Date;
};

export const listLatestPosts = () => apiGet<Post[]>("/post/latest", {pageNumber: 1, pageSize: 10});

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
