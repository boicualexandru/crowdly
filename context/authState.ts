export interface AuthState {
  hasLoaded: boolean;
  isAuthenticated: boolean;
  username?: string;
  token?: string;
}

export const initialAuthState: AuthState = {
  hasLoaded: false,
  isAuthenticated: false,
  username: undefined,
  token: undefined,
};
