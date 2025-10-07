import apiClient from "../service/axiosService";
import { Post } from "../service/axiosService";
import * as localStorageService from "../service/localStorageService";
import { LocalStorageKeys } from "../constants/localStorageKeys";

let controller = new AbortController();
let interceptorsInitialized = false;

const setupAxiosInterceptors = (navigate) => {
  if (interceptorsInitialized) return;
  interceptorsInitialized = true;

  const cancelAllRequests = (reason = "Operation canceled by user.") => {
    controller.abort();
    console.log(reason);
    controller = new AbortController();
  };

  const refreshToken = async () => {
    const refreshToken = localStorageService.getValue(LocalStorageKeys.RefreshToken);
    const accessToken = localStorageService.getValue(LocalStorageKeys.AuthToken);

    if (!refreshToken) {
      cancelAllRequests("Missing refresh token, logging out.");
      window.localStorage.clear();
      navigate("/login");
      return null;
    }

    try {
      const payload = { accessToken, refreshToken };
      const response = await Post(
        `${process.env.REACT_APP_COMMON_AUTH_API_URL}/Account/RefreshToken`,
        payload
      );

      const newTokens = response?.data?.data;
      if (newTokens) {
        localStorageService.setKey(LocalStorageKeys.AuthToken, newTokens.accessToken);
        localStorageService.setKey(LocalStorageKeys.RefreshToken, newTokens.refreshToken);
        return newTokens.accessToken;
      }
      return null;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      cancelAllRequests("Token refresh failed. Logging out.");
      window.localStorage.clear();
      navigate("/login");
      return null;
    }
  };


  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorageService.getValue(LocalStorageKeys.AuthToken);
      if (token) config.headers.Authorization = `Bearer ${token}`;
      config.signal = controller.signal;
      return config;
    },
    (error) => Promise.reject(error)
  );


  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.name === "CanceledError") {
        console.warn("Request canceled:", error.message);
        return Promise.reject(error);
      }

      const status = error?.response?.status;
      const originalRequest = error?.config;

      if (status === 401) {
        const requestUrl = originalRequest?.url || "";
        if (requestUrl.includes("Account/RefreshToken")) {
          return Promise.reject(error);
        }

        const newAccessToken = await refreshToken();

        if (newAccessToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return apiClient.request(originalRequest);
        } else {
          return Promise.reject(error);
        }
      }


      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data?.title 
      
      if (
        message !== "Pin not set. Verify with OTP to register your PIN." &&
        message !== "No matches found or inquiry number not present"
      ) {
        console.error("error", `${message}!`);
      }

      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
