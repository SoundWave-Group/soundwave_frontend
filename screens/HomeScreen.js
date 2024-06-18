import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";

import GenreContainer from "../components/GenreContainer";
import HomeNavigation from "../components/HomeNavigation";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeNavigation activeRouteName="MainScreen" />

      <ScrollView>
        <View style={styles.genre}>
          <Text style={{ fontSize: 25, color: "green" }}>Your Top Genres</Text>

          <View style={{ flexDirection: "row", flexWrap: 1 }}>
            <GenreContainer
              name="K Pop"
              image={require("../assets/art4.jpg")}
              color="lightblue"
            />
            <GenreContainer name="Indie" color="lightgreen" />
            <GenreContainer name="R&B" color="pink" />
            <GenreContainer name="Pop" color="lightyellow" />
          </View>
        </View>

        <View style={styles.browse}>
          <Text style={{ fontSize: 25, color: "green" }}>Browse More</Text>

          <View style={{ flexDirection: "row", flexWrap: 1 }}>
            <GenreContainer name="Made for You" color="lightblue" />
            <GenreContainer name="RELEASED" color="lightgreen" />
            <GenreContainer name="Music Charts" color="pink" />
            <GenreContainer name="Bollywood" color="lightyellow" />
            <GenreContainer name="Pop Fusion" color="grey" />
            <GenreContainer name="Made for You" color="lightblue" />
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
});
