import { API_BASE_URL } from "@env";
import axios, { AxiosInstance } from "axios";

export interface AuthState {
  hasLoaded: boolean;
  isAuthenticated: boolean;
  username?: string;
  token?: string;
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
  isAuthenticated: false,
  username: undefined,
  token: undefined,
  axiosInstance: getAxiosInstance(),
};
