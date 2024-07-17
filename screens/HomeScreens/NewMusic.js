import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";

import HomeNavigation from "../../components/HomeNavigation";
import GenreBox from "../../components/GenreBox";
import Artiste from "../../components/Artiste";

import data from "../../utils/data";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const navigation = useNavigation();

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
              {data[3].recents.map((recents, index) => (
                <Pressable
                  key={index}
                  onPress={() =>
                    navigation.navigate("SongListScreen", {
                      name: recents.name,
                      songs: recents.songs,
                    })
                  }
                  style={styles.genreContainer}
                >
                  <GenreBox artisteName={recents.name} image={recents.photo} />
                </Pressable>
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
              {data[0].artistes.map((artiste, index) => (
                <Pressable
                  key={index}
                  onPress={() =>
                    navigation.navigate("SongListScreen", {
                      genre: artiste.name,
                      songs: artiste.songs,
                    })
                  }
                  style={styles.genreContainer}
                >
                  <Artiste artisteName={artiste.name} image={artiste.photo} />
                </Pressable>
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
            {data[4].mixes.map((mix, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  navigation.navigate("SongListScreen", {
                    name: mix.name,
                    songs: mix.songs,
                  })
                }
                style={styles.genreContainer}
              >
                <GenreBox image={mix.photo} />
              </Pressable>
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
