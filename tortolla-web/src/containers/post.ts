import { loadLoginUserToken } from "./user.ts";

export type Post = {
  postId: number;
  title: string;
  body: string;
};

export const listTopPostIds = fetch("/posts/list_top?top=8", { method: "GET" })
  .then((res) => res.json())
  .then((responseJson) => responseJson as number[]);

export type CreatePostRequest = {
  title: string;
  body: string;
};

export const createPost = (request: CreatePostRequest) =>
  fetch("/posts/create", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-fd-user-token": loadLoginUserToken(),
    },
    body: JSON.stringify({
      title: request.title,
      body: request.body,
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status === 1) {
        throw Error(responseJson);
      }
    });
