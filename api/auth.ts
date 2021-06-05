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

export interface UpdateUserModel {
  email: string;
  firstName: string;
  lastName: string;
}

export interface ChangePasswordModel {
  oldPassword: string;
  newPassword: string;
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
    register: async (
      registerModel: RegisterModel
    ): Promise<LoginResponse | null> => {
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
    updateUser: async (
      user: UpdateUserModel
    ): Promise<LoginResponse | null> => {
      const response = await state.axiosInstance?.post(
        "authenticate/update",
        user
      );

      if (response.status != 200) return null;

      const jwtToken = response.data.token;

      await AsyncStorage.setItem("jwtToken", jwtToken);

      return {
        jwtToken: jwtToken,
      };
    },
    changePassword: async (
      changePassword: ChangePasswordModel
    ): Promise<LoginResponse | null> => {
      const response = await state.axiosInstance?.post(
        "authenticate/changePassword",
        changePassword
      );

      if (response.status != 200) return null;

      const jwtToken = response.data.token;

      await AsyncStorage.setItem("jwtToken", jwtToken);

      return {
        jwtToken: jwtToken,
      };
    },
    uploadAvatar: async (image: string): Promise<LoginResponse | null> => {
      var body = new FormData();

      var formImage = {
        uri: image,
        type: "image/jpeg",
        name: "photo.jpg",
      };
      body.append("formFiles", formImage);

      const response = await state.axiosInstance?.post(
        "authenticate/changePassword",
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
