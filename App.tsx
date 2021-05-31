import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import jwt_decode from "jwt-decode";
import React, { useCallback, useEffect, useReducer } from "react";
import { ActivityIndicator } from "react-native";
import 'moment/locale/ro';

import { AuthActionType, LoadPayloadModel } from "@context/auth/authActions";
import { AuthContext } from "@context/auth/authContext";
import { authReducer } from "@context/auth/authReducer";
import { initialAuthState } from "@context/auth/authState";
import { PreferencesActionType } from "@context/preferences/preferencesActions";
import { PreferencesContext } from "@context/preferences/preferencesContext";
import { preferencesReducer } from "@context/preferences/preferencesReducer";
import {
  initialPreferencesState,
  PreferencesState,
} from "@context/preferences/preferencesState";

import ThemeColors from "@theme/theme-colors";

import RootStackNavigation from "./navigation/rootStack";

export default function App() {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  const [preferencesState, preferencesDispatch] = useReducer(
    preferencesReducer,
    initialPreferencesState
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

  useEffect(() => {
    (async () => {
      await Promise.all([loadAuthState(), loadPreferencesState()]);
    })();
  }, []);

  if (!authState.hasLoaded)
    return (
      <ActivityIndicator
        size="large"
        color={ThemeColors.primary}
        style={{ marginVertical: 16 }}
      />
    );

  return (
    <AuthContext.Provider value={{ state: authState, dispatch: authDispatch }}>
      <PreferencesContext.Provider
        value={{ state: preferencesState, dispatch: preferencesDispatch }}
      >
        <React.Fragment>
          <NavigationContainer>
            <RootStackNavigation />
          </NavigationContainer>
          <ExpoStatusBar style="auto" />
        </React.Fragment>
      </PreferencesContext.Provider>
    </AuthContext.Provider>

    // <React.Fragment>
    //   <IconRegistry icons={EvaIconsPack} />
    //   <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>

    //     <TopNavigation
    //       accessoryLeft={BackAction}
    //       title='Application'
    //       style={{marginTop: StatusBar.currentHeight}}
    //     />

    //     <Layout style={styles.container}>
    //     {/* <Text style={{colo: 40}}/> */}
    //     <List style={{ width: "100%" }} data={data} renderItem={renderItem} />
    //     </Layout>

    //     <BottomNavigation style={styles.bottomNavigation} {...navigationState}>
    //       <BottomNavigationTab icon={PersonIcon}/>
    //       <BottomNavigationTab icon={EmailIcon}/>
    //       <BottomNavigationTab icon={PlusIcon}/>
    //       <BottomNavigationTab icon={EmailIcon}/>
    //       <BottomNavigationTab icon={EmailIcon}/>
    //     </BottomNavigation>

    //   </ApplicationProvider>
    //   <ExpoStatusBar style="auto" />
    // </React.Fragment>
  );
}
