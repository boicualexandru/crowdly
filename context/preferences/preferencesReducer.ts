import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  PreferencesActions,
  PreferencesActionType,
} from "./preferencesActions";
import { PreferencesState } from "./preferencesState";

export function preferencesReducer(
  state: PreferencesState,
  action: PreferencesActions
): PreferencesState {
  switch (action.type) {
    case PreferencesActionType.Load: {
      return { ...action.payload };
    }
    case PreferencesActionType.AddVendorToFavorites: {
      const isVendorAlreadyFavorite =
        state.favoriteVendors?.includes(action.payload.vendorId) ?? false;
      const newState = {
        ...state,
        favoriteVendors: isVendorAlreadyFavorite
          ? state.favoriteVendors
          : [...(state.favoriteVendors ?? []), action.payload.vendorId],
      };
      AsyncStorage.setItem("preferences", JSON.stringify(newState)).then();
      return newState;
    }
    case PreferencesActionType.RemoveVendorFromFavorites: {
      const isVendorAlreadyFavorite =
        state.favoriteVendors?.includes(action.payload.vendorId) ?? false;
      const newState = {
        ...state,
        favoriteVendors: isVendorAlreadyFavorite
          ? (state.favoriteVendors ?? []).filter(
              (v) => v != action.payload.vendorId
            )
          : state.favoriteVendors,
      };
      AsyncStorage.setItem("preferences", JSON.stringify(newState)).then();
      return newState;
    }
  }
}
