import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { useState } from "react";

import LandingScreen from "../screens/LandingScreen";

const SoundwaveLogo = require("../assets/Soundwave-Logo.png");

export default function Splash() {
  const [splash, setSplash] = useState(<SplashScreen />);

  setTimeout(() => {
    setSplash(<LandingScreen />);
  }, 2000);

  return splash;
}

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={SoundwaveLogo} alt="Soundwave Logo" />
      <Text
        style={{
          color: "#0A4A3B",
          fontSize: 25,
          marginTop: 10,
          fontStyle: "italic",
        }}
      >
        SoundWave
      </Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#70CFB8",
    alignItems: "center",
    justifyContent: "center",
  },
});
