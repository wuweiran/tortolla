import { isSignedIn, loadCurrentUserToken, signOut } from "./user.ts";

const endpoint = "https://tortolla-service-tortolla.azuremicroservices.io";

enum ApiResponseStatus {
  SUCCESS = 0,
  FAIL = 1,
}

enum ApiResponseErrorCode {
  UNAUTHORIZED = "A0300",
  WRONG_PARAM = "A0400",
}

type ApiResponse<T> = {
  status: ApiResponseStatus;
  errorCode?: ApiResponseErrorCode;
  errorMsg?: string;
  resultBody?: T;
};

export function apiPost<Request, Response>(
  path: string,
  request?: Request
): Promise<Response> {
  const userToken = loadCurrentUserToken();
  return fetch(`${endpoint}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(userToken && { "x-fd-user-token": userToken }),
    },
    body: request ? JSON.stringify(request) : undefined,
  })
    .then((response) => response.json())
    .catch(() => {
      throw `Cannot connect ${path}`;
    })
    .then((response) => response as ApiResponse<Response>)
    .then((response) => {
      if (response.status !== ApiResponseStatus.SUCCESS) {
        if (
          response.errorCode == ApiResponseErrorCode.UNAUTHORIZED &&
          isSignedIn()
        ) {
          signOut();
        }
        throw response;
      } else {
        return response.resultBody!;
      }
    });
}

export function apiGet<Response>(
  path: string,
  parameters?: Record<string, unknown>
): Promise<Response> {
  let url = `${endpoint}${path}`;
  if (parameters) {
    const stringParameters = Object.fromEntries(
      Object.entries(parameters).map(([key, value]) => [
        key,
        JSON.stringify(value),
      ])
    );
    const urlParameters = new URLSearchParams(stringParameters);
    url = url + "?" + urlParameters.toString();
  }
  const userToken = loadCurrentUserToken();
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(userToken && { "x-fd-user-token": userToken }),
    },
  })
    .then((response) => response.json())
    .catch(() => {
      throw `Cannot connect ${path}`;
    })
    .then((response) => response as ApiResponse<Response>)
    .then((response) => {
      if (response.status !== ApiResponseStatus.SUCCESS) {
        if (
          response.errorCode == ApiResponseErrorCode.UNAUTHORIZED &&
          isSignedIn()
        ) {
          signOut();
        }
        throw response;
      } else {
        return response.resultBody!;
      }
    });
}
