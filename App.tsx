import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "context/authContext";
import { authReducer } from "context/authReducer";
import { initialAuthState } from "context/authState";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useReducer } from "react";

import RootStackNavigation from "./navigation/root-stack";

export default function App() {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
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
