import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";

import { AuthContext } from "@context/auth/authContext";
import { AuthActionType } from "@context/auth/authActions";

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

const useUserApi = () => {
  const { state, dispatch } = useContext(AuthContext);

  return {
    login: async (loginModel: LoginModel): Promise<boolean> => {
      const response = await state.axiosInstance?.post(
        "user/login",
        loginModel
      );

      if (response.status != 200) return false;

      const jwtToken = response.data.token;

      await AsyncStorage.setItem("jwtToken", jwtToken);

      dispatch({
        type: AuthActionType.Login,
        payload: {
          jwtToken: jwtToken,
        },
      });

      return true;
    },
    logout: async (): Promise<void> => {
      await AsyncStorage.removeItem("jwtToken");
    },
    register: async (
      registerModel: RegisterModel
    ): Promise<boolean> => {
      const response = await state.axiosInstance?.post(
        "user/register",
        registerModel
      );

      if (response.status != 200) return false;

      const jwtToken = response.data.token;

      await AsyncStorage.setItem("jwtToken", jwtToken);

      dispatch({
        type: AuthActionType.Login,
        payload: {
          jwtToken: jwtToken,
        },
      });

      return true;
    },
    updateUser: async (
      user: UpdateUserModel
    ): Promise<boolean> => {
      const response = await state.axiosInstance?.post(
        "user/update",
        user
      );

      if (response.status != 200) return false;

      const jwtToken = response.data.token;

      await AsyncStorage.setItem("jwtToken", jwtToken);

      dispatch({
        type: AuthActionType.Login,
        payload: {
          jwtToken: jwtToken,
        },
      });

      return true;
    },
    changePassword: async (
      changePassword: ChangePasswordModel
    ): Promise<boolean> => {
      const response = await state.axiosInstance?.post(
        "user/changePassword",
        changePassword
      );

      if (response.status != 200) return false;

      const jwtToken = response.data.token;

      await AsyncStorage.setItem("jwtToken", jwtToken);

      dispatch({
        type: AuthActionType.Login,
        payload: {
          jwtToken: jwtToken,
        },
      });

      return true;
    },
    uploadAvatar: async (image: string): Promise<boolean> => {
      var body = new FormData();

      var formImage = {
        uri: image,
        type: "image/jpeg",
        name: "photo.jpg",
      };
      body.append("formFile", formImage);

      const response = await state.axiosInstance?.post(
        "user/uploadAvatar",
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status != 200) return false;

      const jwtToken = response.data.token;

      await AsyncStorage.setItem("jwtToken", jwtToken);

      dispatch({
        type: AuthActionType.Login,
        payload: {
          jwtToken: jwtToken,
        },
      });
      
      return true;
    },
  };
};

export default useUserApi;
