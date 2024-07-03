import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";

import HomeNavigation from "../../components/HomeNavigation";
import GenreContainer from "../../components/GenreContainer";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeNavigation activeRouteName="NewMusic" />

      <ScrollView>
        <View style={styles.genre}>
          <Text style={{ fontSize: 25, color: "green", marginLeft: 5 }}>
            New Music
          </Text>

          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 20 }}
          >
            <GenreContainer name="Trending Ghana" color="lightblue" />
            <GenreContainer name="Worldwide" color="lightblue" />
            <GenreContainer name="Release Radar" color="lightgreen" />
            <GenreContainer name="Country Songs" color="teal" />
            <GenreContainer name="Nigeria" color="lightblue" />
            <GenreContainer name="Benin" color="lightblue" />
            <GenreContainer name="Newly Released" color="yellow" />
            <GenreContainer name="Asakaa" color="red" />
          </View>
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
    marginLeft: 5,
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
