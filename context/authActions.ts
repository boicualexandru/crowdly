export enum AuthActionType {
  Load,
  Login,
  Logout,
}

export interface LoadPayloadNotAuthenticatedModel {
  isAuthenticated: false;
}

export interface LoadPayloadAuthenticatedModel {
  isAuthenticated: true;
  jwtToken: string;
  username: string;
}

export type LoadPayloadModel = LoadPayloadAuthenticatedModel | LoadPayloadNotAuthenticatedModel;

export interface Load {
  type: AuthActionType.Load;
  payload: LoadPayloadModel;
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

export type AuthActions = Load | Login | Logout;
