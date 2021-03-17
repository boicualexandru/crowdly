import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import RootStackNavigation from "./navigation/root-stack";

export default function App() {
  return (
    <React.Fragment>
      <RootStackNavigation />
      <ExpoStatusBar style="auto" />
    </React.Fragment>

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
