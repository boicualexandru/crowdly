import { AuthActions, AuthActionType } from "./authActions";
import { AuthState, getAxiosInstance } from "./authState";

export function authReducer(state: AuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionType.Load:
      return {
        ...state,
        hasLoaded: true,
        isAuthenticated: action.payload.isAuthenticated,
        username: action.payload.isAuthenticated ? action.payload.username : undefined,
        token: action.payload.isAuthenticated ? action.payload.jwtToken : undefined,
        axiosInstance: getAxiosInstance(action.payload.isAuthenticated ? action.payload.jwtToken : undefined),
      };
    case AuthActionType.Login:
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload.username,
        token: action.payload.jwtToken,
        axiosInstance: getAxiosInstance(action.payload.jwtToken),
      };
    case AuthActionType.Logout:
      return {
        ...state,
        isAuthenticated: false,
        username: undefined,
        token: undefined,
        axiosInstance: getAxiosInstance(),
      };
  }
}
