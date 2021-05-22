import { AuthActions, AuthActionType } from "./authActions";
import { AuthState } from "./authState";

export function authReducer(state: AuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionType.Login:
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload.username,
        token: action.payload.jwtToken,
      };
    case AuthActionType.Logout:
      return {
        ...state,
        isAuthenticated: false,
        username: undefined,
        token: undefined,
      };
  }
}
