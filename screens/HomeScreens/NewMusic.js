import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";

import HomeNavigation from "../../components/HomeNavigation";
import GenreContainer from "../../components/GenreContainer";
import Artiste from "../../components/Artiste";

const recentlyPlayed = require.context("../../assets/recents", true);
const recentlyPlayedList = recentlyPlayed.keys().map(recentlyPlayed);

const mixes = require.context("../../assets/mixes", true);
const mixesList = mixes.keys().map(mixes);

const artistes = require.context("../../assets/artistes", true);
const artistesList = artistes.keys().map(artistes);
const artistesName = ["Burna Boy", "Dave", "Isaiah Robin", "Tyla"];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeNavigation activeRouteName="NewMusic" />

      <ScrollView>
        <View style={styles.genre}>
          <Text style={{ fontSize: 25, color: "green", marginLeft: 5 }}>
            Recently played
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 20 }}
          >
            <View
              style={{ flexDirection: "row", flexWrap: "wrap", marginLeft: 5 }}
            >
              {recentlyPlayedList.map((image, index) => (
                <GenreContainer key={index} image={image} />
              ))}
            </View>
          </ScrollView>

          <Text
            style={{
              fontSize: 25,
              color: "green",
              marginLeft: 5,
              marginTop: 50,
            }}
          >
            Your favorite artists
          </Text>

          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ flexDirection: "row", gap: 10, marginTop: 20 }}
            >
              {artistesList.map((image, index) => (
                <Artiste key={index} image={image} name={artistesName[index]} />
              ))}
            </ScrollView>
          </View>

          <Text
            style={{
              fontSize: 25,
              color: "green",
              marginLeft: 5,
              marginTop: 50,
            }}
          >
            Your top mixes
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 5 }}
          >
            {mixesList.map((image, index) => (
              <GenreContainer key={index} image={image} />
            ))}
          </ScrollView>
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
