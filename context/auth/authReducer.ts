import jwt_decode from "jwt-decode";

import { AuthActions, AuthActionType } from "./authActions";
import { AuthState, getAxiosInstance, User } from "./authState";

interface JwtClaimsModel {
  ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]: string;
  ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]: string;
  jti: string;
  exp: number;
  iss: string;
  aud: string;
  firstName: string;
  lastName: string;
  image: string;
}

const convertJwtTokenToUser = (jwtToken: string): User => {
  const decodedToken = jwt_decode<JwtClaimsModel>(jwtToken);

  return {
    id:
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ],
    token: jwtToken,
    email:
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ],
    firstName: decodedToken.firstName,
    lastName: decodedToken.lastName,
    image: decodedToken.image,
  };
};

export function authReducer(state: AuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionType.Load: {
      if (!action.payload.jwtToken)
        return {
          ...state,
          hasLoaded: true,
          user: undefined,
          axiosInstance: getAxiosInstance(),
        };

      const user: User = convertJwtTokenToUser(action.payload.jwtToken);

      return {
        ...state,
        hasLoaded: true,
        user: user,
        axiosInstance: getAxiosInstance(action.payload.jwtToken),
      };
    }
    case AuthActionType.Login: {
      const user: User = convertJwtTokenToUser(action.payload.jwtToken);
      return {
        ...state,
        user: user,
        axiosInstance: getAxiosInstance(action.payload.jwtToken),
      };
    }
    case AuthActionType.Logout: {
      return {
        ...state,
        user: undefined,
        axiosInstance: getAxiosInstance(),
      };
    }
  }
}
