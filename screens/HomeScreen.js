import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";

import GenreContainer from "../components/GenreContainer";
import HomeNavigation from "../components/HomeNavigation";

const browseImages = require.context("../assets/browse", true);
const browseImagesList = browseImages.keys().map(browseImages);

const genreImages = require.context("../assets/genre", true);
const genreImagesList = genreImages.keys().map(genreImages);

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeNavigation activeRouteName="MainScreen" />
      <ScrollView>
        <View style={styles.section}>
          <Text style={[styles.headerStyle, { marginBottom: 10 }]}>
            Your Top Genres
          </Text>

          <View
            style={{ marginLeft: 5, flexWrap: "wrap", flexDirection: "row" }}
          >
            {genreImagesList.map((image, index) => (
              <GenreContainer key={index} image={image} />
            ))}
          </View>
        </View>

        <Text style={[styles.headerStyle, { marginTop: 40, marginBottom: 10 }]}>
          Browse More
        </Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap", marginLeft: 5 }}>
          {browseImagesList.map((image, index) => (
            <GenreContainer key={index} image={image} />
          ))}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    marginTop: 30,
  },
  headerStyle: {
    fontSize: 25,
    color: "green",
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
