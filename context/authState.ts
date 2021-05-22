export interface AuthState {
  isAuthenticated: boolean;
  username?: string;
  token?: string;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  username: undefined,
  token: undefined,
};
