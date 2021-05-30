import React from "react";

import { PreferencesActions } from "./preferencesActions";
import { initialPreferencesState, PreferencesState } from "./preferencesState";

export const PreferencesContext = React.createContext<{
  state: PreferencesState;
  dispatch: React.Dispatch<PreferencesActions>;
}>({
  state: initialPreferencesState,
  dispatch: () => undefined,
});
