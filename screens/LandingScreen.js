import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

import BoxContainer from "../components/BoxContainer";

export default function App() {
  return (
    <View style={styles.container}>
      <BoxContainer />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#70CFB8",
    alignItems: "center",
    justifyContent: "center",
  },
});
