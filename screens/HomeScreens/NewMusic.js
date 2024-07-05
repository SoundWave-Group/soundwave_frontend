import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";

import HomeNavigation from "../../components/HomeNavigation";
import GenreContainer from "../../components/GenreContainer";
import Artiste from "../../components/Artiste";
import GenreBox from "../../components/GenreBox";

const placeholderArtisteImage = require("../../assets/singer1.jpg");

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
            <GenreContainer name="Afro Gospel Hits" color="lightblue" />
            <GenreContainer name="Worldwide" color="lightblue" />
            <GenreContainer name="Release Radar" color="lightgreen" />
            <GenreContainer name="Country Songs" color="teal" />
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: "row", gap: 10, marginTop: 20 }}
          >
            <Artiste name="Burna Boy" image={placeholderArtisteImage} />
            <Artiste name="Dave" />
            <Artiste name="Isaiah Robin" />
            <Artiste name="Tyla" />
          </ScrollView>

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
            <GenreBox name="Hip Hop" />
            <GenreBox name="Pop" color="yellow" />
            <GenreBox name="Rock" color="grey" />
            <GenreBox name="Jazz" color="lightblue" />
            <GenreBox name="Bollywood" color="pink" />
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
