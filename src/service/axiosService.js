import axios from "axios";
import * as localStorageService from "./localStorageService";
import { LocalStorageKeys } from "../constants/localStorageKeys";


const apiClient = axios.create({
  baseURL: process.env.REACT_APP_COMMON_AUTH_API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach auth token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorageService.getValue(LocalStorageKeys.AuthToken);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Reusable HTTP Methods
export const Get = async (url, params = {}, config = {}) => {
  try {
    const response = await apiClient.get(url, { params, ...config });
    return response;
  } catch (error) {
    throw error;
  }
};

export const Post = async (url, data = {}, config = {}) => {
  try {
    const response = await apiClient.post(url, data, config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const Put = async (url, data = {}, config = {}) => {
  try {
    const response = await apiClient.put(url, data, config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const Delete = async (url, config = {}) => {
  try {
    const response = await apiClient.delete(url, config);
    return response;
  } catch (error) {
    throw error;
  }
};

export default apiClient;
