import { isSignedIn, loadCurrentUserToken, signOut } from "./user.ts";

const endpoint = import.meta.env.DEV
  ? "http://localhost:8080"
  : "https://tortolla-service.niceriver-680136a0.eastasia.azurecontainerapps.io";

enum ApiResponseStatus {
  SUCCESS = 0,
  FAIL = 1,
}

export enum ApiErrorCode {
  CANCELLED = "1",
  UNKNOWN = "2",
  INVALID_ARGUMENT = "3",
  DEADLINE_EXCEEDED = "4",
  NOT_FOUND = "5",
  ALREADY_EXISTS = "6",
  PERMISSION_DENIED = "7",
  RESOURCE_EXHAUSTED = "8",
  FAILED_PRECONDITION = "9",
  ABORTED = "10",
  OUT_OF_RANGE = "11",
  UNIMPLEMENTED = "12",
  INTERNAL = "13",
  UNAVAILABLE = "14",
  DATA_LOSS = "15",
  UNAUTHENTICATED = "16",
}

type ApiResponse<T> = {
  status: ApiResponseStatus;
  errorCode?: ApiErrorCode;
  errorMsg?: string;
  resultBody?: T;
};

export type ApiError = {
  code: ApiErrorCode;
  message?: string;
};

interface ApiPromise<Response> {
  then<TResult1 = Response, TResult2 = never>(
    onfulfilled?:
      | ((value: Response) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((apiError: ApiError) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): ApiPromise<TResult1 | TResult2>;

  catch<TResult = never>(
    onrejected?:
      | ((apiError: ApiError) => TResult | PromiseLike<TResult>)
      | undefined
      | null
  ): ApiPromise<Response | TResult>;

  finally(onfinally?: (() => void) | undefined | null): ApiPromise<Response>;
}

export function apiPost<Request, Response>(
  path: string,
  request?: Request
): ApiPromise<Response> {
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
      console.warn(`Cannot access ${path}`);
      throw {
        code: ApiErrorCode.UNAVAILABLE,
        message: `Cannot access ${path}`,
      } as ApiError;
    })
    .then((response) => response as ApiResponse<Response>)
    .then((response) => {
      if (response.status !== ApiResponseStatus.SUCCESS) {
        if (
          response.errorCode == ApiErrorCode.UNAUTHENTICATED &&
          isSignedIn()
        ) {
          signOut();
        }
        throw {
          code: response.errorCode!,
          message: response.errorMsg,
        } as ApiError;
      } else {
        return response.resultBody!;
      }
    });
}

export function apiGet<Response>(
  path: string,
  parameters?: Record<string, unknown>
): ApiPromise<Response> {
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
      console.warn(`Cannot access ${path}`);
      throw {
        code: ApiErrorCode.UNAVAILABLE,
        message: `Cannot access ${path}`,
      } as ApiError;
    })
    .then((response) => response as ApiResponse<Response>)
    .then((response) => {
      if (response.status !== ApiResponseStatus.SUCCESS) {
        if (
          response.errorCode == ApiErrorCode.UNAUTHENTICATED &&
          isSignedIn()
        ) {
          signOut();
        }
        throw {
          code: response.errorCode!,
          message: response.errorMsg,
        } as ApiError;
      } else {
        return response.resultBody!;
      }
    });
}
