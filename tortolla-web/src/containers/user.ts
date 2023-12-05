import { apiGet, apiPost } from "./api.ts";

export type UserResponse = {
  id: number;
  username: string;
  fullName?: string;
  createdTime: string;
};

export type UserInfo = UserResponse;

export type UserBasicInfo = {
  id: number;
  username: string;
};

export const currentUser = () => {
  const currentUserString = sessionStorage.getItem("current-user");
  return currentUserString
    ? (JSON.parse(currentUserString) as UserInfo)
    : undefined;
};

export const loadCurrentUserToken = () => {
  return sessionStorage.getItem("token") ?? undefined;
};

const saveCurrentUserToken = (token: string) => {
  sessionStorage.setItem("token", token);
};

const saveCurrentUserFromToken = () =>
  apiGet<UserResponse>("/user/me").then((result) =>
    sessionStorage.setItem("current-user", JSON.stringify(result))
  );

export const isSignedIn = () => {
  const user = currentUser();
  return typeof user === "object";
};

export type UserSignInRequest = {
  username: string;
  password: string;
};

export const signIn = (request: UserSignInRequest) =>
  apiPost<UserSignInRequest, string>("/user/sign-in", request).then(
    (result) => {
      saveCurrentUserToken(result);
      return saveCurrentUserFromToken();
    }
  );

export type UserSignUpRequest = {
  username: string;
  password: string;
  fullName: string;
};

export const signUp = (request: UserSignUpRequest) =>
  apiPost<UserSignUpRequest, string>("/user/sign-up", request).then(
    (result) => {
      saveCurrentUserToken(result);
      return saveCurrentUserFromToken();
    }
  );

export const signOut = () => {
  sessionStorage.removeItem("current-user");
  sessionStorage.removeItem("token");
};
