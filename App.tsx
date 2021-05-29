import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import jwt_decode from "jwt-decode";
import React, { useEffect, useReducer } from "react";
import { ActivityIndicator } from "react-native";

import { AuthActionType } from "@context/authActions";
import { AuthContext } from "@context/authContext";
import { authReducer } from "@context/authReducer";
import { initialAuthState } from "@context/authState";

import ThemeColors from "@theme/theme-colors";

import RootStackNavigation from "./navigation/rootStack";

export default function App() {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    (async () => {
      const jwtToken = await AsyncStorage.getItem("jwtToken");
      if (jwtToken == null) {
        dispatch({
          type: AuthActionType.Load,
          payload: { isAuthenticated: false },
        });
        return;
      }

      var decodedToken = jwt_decode<{ username: string }>(jwtToken);

      dispatch({
        type: AuthActionType.Load,
        payload: {
          isAuthenticated: true,
          jwtToken: jwtToken,
          username: decodedToken.username,
        },
      });
    })();
  }, []);

  if (!state.hasLoaded)
    return (
      <ActivityIndicator
        size="large"
        color={ThemeColors.primary}
        style={{ marginVertical: 16 }}
      />
    );

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <React.Fragment>
        <NavigationContainer>
          <RootStackNavigation />
        </NavigationContainer>
        <ExpoStatusBar style="auto" />
      </React.Fragment>
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
