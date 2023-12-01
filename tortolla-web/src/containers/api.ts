import { loadCurrentUserToken } from "./user.ts";

const endpoint = "http://localhost:8080";

enum ApiResponseStatus {
  SUCCESS = 0,
  FAIL = 1,
}

type ApiResponse<T> = {
  status: ApiResponseStatus;
  resultBody: T;
};

export function apiPost<Request, Response>(
  path: string,
  request?: Request
): Promise<Response> {
  return fetch(`${endpoint}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-fd-user-token": loadCurrentUserToken(),
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
        throw response;
      } else {
        return response.resultBody;
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
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-fd-user-token": loadCurrentUserToken(),
    },
  })
    .then((response) => response.json())
    .catch(() => {
        throw `Cannot connect ${path}`;
    })
    .then((response) => response as ApiResponse<Response>)
    .then((response) => {
      if (response.status !== ApiResponseStatus.SUCCESS) {
        throw response;
      } else {
        return response.resultBody;
      }
    });
}
