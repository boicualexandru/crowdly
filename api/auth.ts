import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "context/authContext";
import jwt_decode from "jwt-decode";
import { useContext } from "react";

export interface LoginModel {
  username: string;
  password: string;
}

interface LoginResponseSuccess {
  success: true;
  jwtToken: string;
  username: string;
}

interface LoginResponseFail {
  success: false;
}

export type LoginResponse = LoginResponseSuccess | LoginResponseFail;

export interface RegisterModel {
  username: string;
  email: string;
  password: string;
}

export interface JwtClaimsModel {
  ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]: string;
  ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]: string;
  jti: string;
  exp: number;
  iss: string;
  aud: string;
}

const useAuthApi = () => {
  const { state } = useContext(AuthContext);

  return {
    login: async (loginModel: LoginModel): Promise<LoginResponse> => {
      const response = await state.axiosInstance?.post(
        "authenticate/login",
        loginModel
      );

      if (response.status != 200) return { success: false };

      const jwtToken = response.data.token;

      var decodedToken = jwt_decode<JwtClaimsModel>(jwtToken);
      console.log("decodedToken: ", decodedToken);

      await AsyncStorage.setItem("jwtToken", jwtToken);

      return {
        success: true,
        jwtToken: jwtToken,
        username:
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ],
      };
    },
    logout: async (): Promise<void> => {
      await AsyncStorage.removeItem("jwtToken");
    },
    register: async (registerModel: RegisterModel): Promise<LoginResponse> => {
      const response = await state.axiosInstance?.post(
        "authenticate/register",
        registerModel
      );

      if (response.status != 200) return { success: false };

      const jwtToken = response.data.token;

      var decodedToken = jwt_decode<JwtClaimsModel>(jwtToken);

      await AsyncStorage.setItem("jwtToken", jwtToken);

      return {
        success: true,
        jwtToken: jwtToken,
        username:
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ],
      };
    },
  };
};

export default useAuthApi;
