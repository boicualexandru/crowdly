import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";

import { AuthContext } from "@context/auth/authContext";

export interface LoginModel {
  email: string;
  password: string;
}

export interface LoginResponse {
  jwtToken: string;
}

export interface RegisterModel {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const useAuthApi = () => {
  const { state } = useContext(AuthContext);

  return {
    login: async (loginModel: LoginModel): Promise<LoginResponse | null> => {
      const response = await state.axiosInstance?.post(
        "authenticate/login",
        loginModel
      );

      if (response.status != 200) return null;

      const jwtToken = response.data.token;

      await AsyncStorage.setItem("jwtToken", jwtToken);

      return {
        jwtToken: jwtToken,
      };
    },
    logout: async (): Promise<void> => {
      await AsyncStorage.removeItem("jwtToken");
    },
    register: async (registerModel: RegisterModel): Promise<LoginResponse | null> => {
      const response = await state.axiosInstance?.post(
        "authenticate/register",
        registerModel
      );

      if (response.status != 200) return null;

      const jwtToken = response.data.token;

      await AsyncStorage.setItem("jwtToken", jwtToken);

      return {
        jwtToken: jwtToken,
      };
    },
  };
};

export default useAuthApi;
