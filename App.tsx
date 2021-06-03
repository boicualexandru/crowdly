import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import jwt_decode from "jwt-decode";
import "moment/locale/ro";
import React, { useCallback, useEffect, useReducer } from "react";

import { AuthActionType, LoadPayloadModel } from "@context/auth/authActions";
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

    const actionPayload: LoadPayloadModel = jwtToken
      ? {
          isAuthenticated: true,
          jwtToken: jwtToken,
          username: jwt_decode<{ username: string }>(jwtToken).username,
        }
      : {
          isAuthenticated: false,
        };

    authDispatch({
      type: AuthActionType.Load,
      payload: actionPayload,
    });
  }, []);

  const loadPreferencesState = useCallback(async () => {
    const preferencesJson = await AsyncStorage.getItem("preferences");
    if (!preferencesJson) return;

    const preferences: PreferencesState = JSON.parse(preferencesJson);
    preferencesDispatch({
      type: PreferencesActionType.Load,
      payload: {
        favoriteVendors: preferences.favoriteVendors ?? [],
      },
    });
  }, []);

  const loadCheckoutState = useCallback(async () => {
    const checkoutJson = await AsyncStorage.getItem("checkout");
    if (!checkoutJson) return;

    const checkout: CheckoutState = JSON.parse(checkoutJson);
    checkoutDispatch({
      type: CheckoutActionType.Load,
      payload: checkout,
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
          <React.Fragment>
            <NavigationContainer>
              <RootStackNavigation />
            </NavigationContainer>
            <ExpoStatusBar style="auto" />
          </React.Fragment>
        </CheckoutContext.Provider>
      </PreferencesContext.Provider>
    </AuthContext.Provider>
  );
}
