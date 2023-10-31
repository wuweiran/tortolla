import Cookies, { CookieSetOptions } from "universal-cookie";

const cookieOptions: CookieSetOptions = {
  path: "/",
  sameSite: "lax",
  secure: false,
};

const cookies = new Cookies.default(null, cookieOptions);

export type UserInfo = {
  id: number;
  username: string;
  fullName?: string;
  createdTime: Date;
};

export const loginUser = () => {
  return cookies.get("current-user") as UserInfo;
};

export const loadLoginUserToken = () => {
  return cookies.get("token") as string;
};

const saveLoginUserToken = (token: string) => {
  cookies.set("token", token);
};

const saveLoginUserFromToken = (token: string) => {
  fetch("/bloggers?token=" + token, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status === 1) {
        console.error("bad token");
      } else {
        cookies.set("current-user", responseJson.resultBody);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const isLogin = () => {
  const user = loginUser();
  return typeof user === "object";
};

export type UserSignInRequest = {
  username: string;
  password: string;
};

export const login = (payload: UserSignInRequest) =>
  fetch("/bloggers/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: payload.username,
      password: payload.password,
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status === 1) {
        throw Error(responseJson);
      } else {
        saveLoginUserToken(responseJson.resultBody);
        saveLoginUserFromToken(responseJson.resultBody);
      }
    });

export type UserSignUpRequest = {
  username: string;
  password: string;
  realName: string;
};

export const signUp = (payload: UserSignUpRequest) =>
  fetch("/bloggers/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: payload.username,
      password: payload.password,
      realName: payload.realName,
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status === 1) {
        throw Error(responseJson);
      } else {
        saveLoginUserToken(responseJson.resultBody);
        saveLoginUserFromToken(responseJson.resultBody);
      }
    });

export const logout = () => {
  cookies.remove("current-user");
  cookies.remove("token");
};
