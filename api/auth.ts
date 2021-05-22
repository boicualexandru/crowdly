import { API_BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

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

export const login = async (loginModel: LoginModel): Promise<LoginResponse> => {
  const responseRaw = await fetch(`${API_BASE_URL}/authenticate/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginModel),
  });

  if (responseRaw.status != 200) return { success: false };

  const jwtToken = await responseRaw.text();

  var decodedToken = jwt_decode<{ username: string }>(jwtToken);

  await AsyncStorage.setItem("jwtToken", jwtToken);

  return {
    success: true,
    jwtToken: jwtToken,
    username: decodedToken.username,
  };
};

export const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem("jwtToken");
};
