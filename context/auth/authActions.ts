export enum AuthActionType {
  Load,
  Login,
  Logout,
}

export interface Load {
  type: AuthActionType.Load;
  payload: {
    jwtToken?: string;
  };
}

export interface Login {
  type: AuthActionType.Login;
  payload: {
    jwtToken: string;
  };
}

export interface Logout {
  type: AuthActionType.Logout;
}

export type AuthActions = Load | Login | Logout;
