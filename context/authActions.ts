export enum AuthActionType {
  Login,
  Logout,
}

export interface Login {
  type: AuthActionType.Login;
  payload: {
    jwtToken: string;
    username: string;
  };
}

export interface Logout {
  type: AuthActionType.Logout;
}

export type AuthActions = Login | Logout;
