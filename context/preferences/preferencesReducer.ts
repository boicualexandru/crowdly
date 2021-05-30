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
      return action.payload;
    }
    case PreferencesActionType.AddVendorToFavorites: {
      const isFavorite = state.favoriteVendors.includes(action.payload.vendorId);
      const newState = {
        ...state,
        favoriteVendors: isFavorite
          ? state.favoriteVendors
          : [...state.favoriteVendors, action.payload.vendorId],
      };
      AsyncStorage.setItem("preferences", JSON.stringify(newState)).then();
      return newState;
    }
    case PreferencesActionType.RemoveVendorFromFavorites: {
      const newState = {
        ...state,
        favoriteVendors: state.favoriteVendors
          .filter(v => v != action.payload.vendorId),
      };
      AsyncStorage.setItem("preferences", JSON.stringify(newState)).then();
      return newState;
    }
  }
}
