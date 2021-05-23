import { API_BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "context/authContext";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
// import axios from 'axios';

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

const useAuthApi = () => {
  const { state, dispatch } = useContext(AuthContext);

  const login = async (loginModel: LoginModel): Promise<LoginResponse> => {
    // const response = await axios({
    //   method: 'post',
    //   url: `${API_BASE_URL}/authenticate/login`,
    //   data: loginModel
    // });
    
    // if (response.status != 200) return { success: false };

    // const jwtToken = response.data.token;

    // console.log('jwtToken -- ', jwtToken);
    
    console.log('jwtToken -- ', state?.token);
    const responseRaw = await fetch(`${API_BASE_URL}/authenticate/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": state?.token ?? ''
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

  const logout = async (): Promise<void> => {
    await AsyncStorage.removeItem("jwtToken");
  };

  const register = async (
    registerModel: RegisterModel
  ): Promise<LoginResponse> => {
    const responseRaw = await fetch(`${API_BASE_URL}/authenticate/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerModel),
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

  return { login, logout, register };
}

export default useAuthApi;