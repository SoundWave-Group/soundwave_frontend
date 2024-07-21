import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";

import BoxContainer from "../components/BoxContainer";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <BoxContainer />

      <StatusBar style="light" />
    </SafeAreaView>
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
