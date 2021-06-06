import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";

import { AuthContext } from "@context/auth/authContext";
import { AuthActionType } from "@context/auth/authActions";
import { genericServerErrorText } from "./helpers/constants";

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
  phoneNumber?: string;
}

export interface UpdateUserModel {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface ChangePasswordModel {
  oldPassword: string;
  newPassword: string;
}

const useUserApi = () => {
  const { state, dispatch } = useContext(AuthContext);

  return {
    login: async (loginModel: LoginModel): Promise<string | null> => {
      try {
        const response = await state.axiosInstance?.post(
          "user/login",
          loginModel
        );
  
        const jwtToken = response.data.token;
  
        await AsyncStorage.setItem("jwtToken", jwtToken);
  
        dispatch({
          type: AuthActionType.Login,
          payload: {
            jwtToken: jwtToken,
          },
        });
  
        return null;
      } catch (ex) {
        return ex.response?.data?.[0] || genericServerErrorText;
      }
    },
    logout: async (): Promise<void> => {
      await AsyncStorage.removeItem("jwtToken");
    },
    register: async (
      registerModel: RegisterModel
    ): Promise<string | null> => {
      try {
        const response = await state.axiosInstance?.post(
          "user/register",
          registerModel
        );
  
        const jwtToken = response.data.token;
  
        await AsyncStorage.setItem("jwtToken", jwtToken);
  
        dispatch({
          type: AuthActionType.Login,
          payload: {
            jwtToken: jwtToken,
          },
        });
        return null;

      } catch (ex) {
        return ex.response?.data?.[0] || genericServerErrorText;
      }
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
