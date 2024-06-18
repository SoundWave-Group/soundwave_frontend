import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";

import HomeNavigation from "../../components/HomeNavigation";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeNavigation activeRouteName="NewMusic" />

      <ScrollView>
        <View style={styles.genre}>
          <Text style={{ fontSize: 25, color: "green" }}>New Music</Text>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  genre: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 10,
  },
  browse: {
    flex: 1,
    marginTop: 50,
    paddingLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topNavigation: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: "auto",
    paddingLeft: 10,
    marginTop: 20,
  },
});
