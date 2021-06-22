import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import moment from "moment";
import "moment/locale/ro";
import React, { useCallback, useEffect, useReducer } from "react";
import * as Location from 'expo-location';

import { AuthActionType } from "@context/auth/authActions";
import { AuthContext } from "@context/auth/authContext";
import { authReducer } from "@context/auth/authReducer";
import { initialAuthState } from "@context/auth/authState";
import { CheckoutActionType } from "@context/checkout/checkoutActions";
import { CheckoutContext } from "@context/checkout/checkoutContext";
import { checkoutReducer } from "@context/checkout/checkoutReducer";
import {
  CheckoutState,
  initialCheckoutState,
} from "@context/checkout/checkoutState";
import { PreferencesActionType } from "@context/preferences/preferencesActions";
import { PreferencesContext } from "@context/preferences/preferencesContext";
import { preferencesReducer } from "@context/preferences/preferencesReducer";
import {
  initialPreferencesState,
  PreferencesState,
} from "@context/preferences/preferencesState";

import RootStackNavigation from "./navigation/rootStack";
import { availableCities, getClosestCity } from "api/helpers/cities";

export default function App() {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  const [preferencesState, preferencesDispatch] = useReducer(
    preferencesReducer,
    initialPreferencesState
  );
  const [checkoutState, checkoutDispatch] = useReducer(
    checkoutReducer,
    initialCheckoutState
  );

  const loadAuthState = useCallback(async () => {
    const jwtToken = await AsyncStorage.getItem("jwtToken");

    authDispatch({
      type: AuthActionType.Load,
      payload: {
        jwtToken: jwtToken ?? undefined
      },
    });    
  }, []);

  const loadPreferencesState = useCallback(async () => {
    const preferencesJson = await AsyncStorage.getItem("preferences");

    const preferences: PreferencesState | null = preferencesJson ? JSON.parse(preferencesJson) : null;

    let currentLocation: Location.LocationObject | null = null;
    try{
      await Location.requestForegroundPermissionsAsync();
      await Location.requestBackgroundPermissionsAsync();
      currentLocation = await Location.getCurrentPositionAsync();
    } catch(ex) { }
    
    const closestCity = currentLocation?.coords == null ? 
      availableCities[0] : 
      getClosestCity(currentLocation?.coords.latitude, currentLocation?.coords.longitude);

    preferencesDispatch({
      type: PreferencesActionType.Load,
      payload: {
        favoriteVendors: preferences?.favoriteVendors ?? [],
        currentCityId: closestCity.id,
      },
    });
  }, []);

  const loadCheckoutState = useCallback(async () => {
    const checkoutJson = await AsyncStorage.getItem("checkout");
    if (!checkoutJson) return;

    const checkout: CheckoutState = JSON.parse(checkoutJson);
    const checkoutParsed: CheckoutState = {
      ...checkout,
      items: checkout.items.map((item) => ({
        ...item,
        period: {
          startDate: moment(item.period.startDate).toDate(),
          endDate: moment(item.period.endDate).toDate(),
        },
      })),
    };

    checkoutDispatch({
      type: CheckoutActionType.Load,
      payload: checkoutParsed,
    });
  }, []);

  useEffect(() => {
    (async () => {
      await SplashScreen.preventAutoHideAsync();
      
      await Promise.all([
        loadAuthState(),
        loadPreferencesState(),
        loadCheckoutState(),
      ]);
      await SplashScreen.hideAsync();
    })();
  }, []);

  if (!authState.hasLoaded) return null;

  return (
    <AuthContext.Provider value={{ state: authState, dispatch: authDispatch }}>
      <PreferencesContext.Provider
        value={{ state: preferencesState, dispatch: preferencesDispatch }}
      >
        <CheckoutContext.Provider
          value={{ state: checkoutState, dispatch: checkoutDispatch }}
        >
          <StripeProvider
            publishableKey={"pk_test_7nqC7bY85h8f0bERWXbIC54Z00evalkYnc"}
            // merchantIdentifier="merchant.identifier"
          >
            <React.Fragment>
              <NavigationContainer>
                <RootStackNavigation />
              </NavigationContainer>
              <ExpoStatusBar style="auto" />
            </React.Fragment>
          </StripeProvider>
        </CheckoutContext.Provider>
      </PreferencesContext.Provider>
    </AuthContext.Provider>
  );
}
