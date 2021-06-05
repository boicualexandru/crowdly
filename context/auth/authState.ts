import { API_BASE_URL } from "@env";
import axios, { AxiosInstance } from "axios";

export interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  token: string;
}

export interface AuthState {
  hasLoaded: boolean;
  user?: User;
  axiosInstance: AxiosInstance;
}

export const getAxiosInstance = (jwtToken?: string): AxiosInstance => {
  const instance = axios.create();

  instance.interceptors.request.use(
    async (config) => {
      config.baseURL = API_BASE_URL;

      config.headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      if (jwtToken) config.headers["Authorization"] = `Bearer ${jwtToken}`;

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  return instance;
};

export const initialAuthState: AuthState = {
  hasLoaded: false,
  axiosInstance: getAxiosInstance(),
};
