import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import ColoredButton from "../components/ColoredButton";
import GenreContainer from "../components/GenreContainer";
import BottomNavigation from "../components/BottomNavigation";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={[styles.topNavigation, { backgroundColor: "transparent" }]}>
        <ColoredButton name="Genre" />
        <ColoredButton name="New Music" color="lightgreen" />
        <ColoredButton name="Trending" color="lightgreen" />
      </View>

      <ScrollView style={{ height: "100%" }}>
        <View style={styles.genre}>
          <Text style={{ fontSize: 25, color: "green" }}>Your Top Genres</Text>

          <View style={{ flexDirection: "row", flexWrap: 1 }}>
            <GenreContainer name="K Pop" color="lightblue" />
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

      <BottomNavigation />
      <StatusBar style="auto" />
    </View>
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
    marginTop: 70,
  },
});
