import Cookies, { CookieSetOptions } from "universal-cookie";
import { apiGet, apiPost } from "./api.ts";

const cookieOptions: CookieSetOptions = {
  path: "/",
  sameSite: "lax",
  secure: false,
};

const cookies = new Cookies(null, cookieOptions);

export type UserResponse = {
  id: number;
  username: string;
  fullName?: string;
  createdTime: Date;
};

export type UserInfo = UserResponse;

export const currentUser = () => {
  return cookies.get("current-user") as UserInfo;
};

export const loadCurrentUserToken = () => {
  return cookies.get("token") as string;
};

const saveCurrentUserToken = (token: string) => {
  cookies.set("token", token);
};

const saveCurrentUserFromToken = () => apiGet<UserResponse>("/user/me").then((result) =>
  cookies.set("current-user", result)
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
  apiPost<UserSignInRequest, string>("/user/sign-in", request).then((result) => {
    saveCurrentUserToken(result);
    return saveCurrentUserFromToken();
  });

export type UserSignUpRequest = {
  username: string;
  password: string;
  realName: string;
};

export const signUp = (request: UserSignUpRequest) =>
  apiPost<UserSignUpRequest, string>("/user/sign-up", request).then((result) => {
    saveCurrentUserToken(result);
    return saveCurrentUserFromToken();
  });

export const signOut = () => {
  cookies.remove("current-user");
  cookies.remove("token");
};
