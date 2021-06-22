import { availableCities } from './../../api/helpers/cities';
export interface PreferencesState {
  favoriteVendors: string[];
  currentCityId: string;
}

export const initialPreferencesState: PreferencesState = {
  favoriteVendors: [],
  currentCityId: availableCities[0].id,
};
