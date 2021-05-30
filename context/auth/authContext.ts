import React from "react";

import { AuthActions } from "./authActions";
import { AuthState, initialAuthState } from "./authState";

export const AuthContext = React.createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthActions>;
}>({
  state: initialAuthState,
  dispatch: () => undefined,
});
