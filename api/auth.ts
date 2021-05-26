import { API_BASE_URL } from "@env";
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
  ['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']: string;
  ['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']: string;
  jti: string;
  exp: number;
  iss: string;
  aud: string;
}

const useAuthApi = () => {
  const { state, dispatch } = useContext(AuthContext);

  const authorizationHeaderValue = state?.token ? `Bearer ${state.token}` : '';

  return {
    login: async (loginModel: LoginModel): Promise<LoginResponse> => {
      console.log("jwtToken -- ", state?.token);
      const responseRaw = await fetch(`${API_BASE_URL}/authenticate/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: authorizationHeaderValue,
        },
        body: JSON.stringify(loginModel),
      });

      if (responseRaw.status != 200) return { success: false };

      const response = await responseRaw.json();
      const jwtToken = response.token;

      var decodedToken = jwt_decode<JwtClaimsModel>(jwtToken);
      console.log("decodedToken: ", decodedToken);
      

      await AsyncStorage.setItem("jwtToken", jwtToken);

      return {
        success: true,
        jwtToken: jwtToken,
        username: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      };
    },
    logout: async (): Promise<void> => {
      await AsyncStorage.removeItem("jwtToken");
    },
    register: async (registerModel: RegisterModel): Promise<LoginResponse> => {
      const responseRaw = await fetch(`${API_BASE_URL}/authenticate/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerModel),
      });

      if (responseRaw.status != 200) return { success: false };

      const response = await responseRaw.json();
      const jwtToken = response.token;

      var decodedToken = jwt_decode<JwtClaimsModel>(jwtToken);

      await AsyncStorage.setItem("jwtToken", jwtToken);

      return {
        success: true,
        jwtToken: jwtToken,
        username: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      };
    },
  };
};

export default useAuthApi;
