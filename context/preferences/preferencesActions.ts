import { PreferencesState } from "./preferencesState";

export enum PreferencesActionType {
  Load,
  AddVendorToFavorites,
  RemoveVendorFromFavorites,
}

export interface Load {
  type: PreferencesActionType.Load;
  payload: PreferencesState;
}

export interface AddVendorToFavorites {
  type: PreferencesActionType.AddVendorToFavorites;
  payload: {
    vendorId: string;
  };
}

export interface RemoveVendorFromFavorites {
  type: PreferencesActionType.RemoveVendorFromFavorites;
  payload: {
    vendorId: string;
  };
}

export type PreferencesActions =
  | Load
  | AddVendorToFavorites
  | RemoveVendorFromFavorites;
