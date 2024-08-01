import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import data from "../utils/data";
import GenreContainer from "../components/GenreContainer";
import HomeNavigation from "../components/HomeNavigation";
import HeroComponent from "../components/HeroComponent";

export default function HomeScreen() {
  const navigation = useNavigation();

  const heroData = data[7].hero[0];

  return (
    <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
      <HomeNavigation activeRouteName="MainScreen" />
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.headerStyle}>Playlists</Text>
          <View style={styles.subSection}>
            <View>
              {
                <Pressable
                  onPress={() =>
                    navigation.navigate("SongListScreen", {
                      genre: heroData.name,
                      songs: heroData.songs,
                    })
                  }
                >
                  <HeroComponent image={heroData.photo} />
                </Pressable>
              }
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.headerStyle}>Made for You</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 10 }}
            >
              {
                // GenreContainer
                data[8].madeforyou.map((genre, index) => (
                  <Pressable
                    key={index}
                    onPress={() => {
                      navigation.navigate("SongListScreen", {
                        genre: genre.name,
                        songs: genre.songs,
                      });
                    }}
                  >
                    <GenreContainer
                      key={index}
                      image={genre.photo}
                      text={genre.name}
                    />
                  </Pressable>
                ))
              }
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.headerStyle}>Trending on SoundWave</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 10 }}
            >
              {
                // GenreContainer
                data[9].trending.map((genre, index) => (
                  <Pressable
                    key={index}
                    onPress={() => {
                      navigation.navigate("SongListScreen", {
                        genre: genre.name,
                        songs: genre.songs,
                      });
                    }}
                  >
                    <GenreContainer key={index} image={genre.photo} />
                  </Pressable>
                ))
              }
            </ScrollView>
          </View>
          <View style={styles.section}>
            <Text style={styles.headerStyle}>Genres</Text>
            <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
              {
                // GenreBox
                data[2].genre.map((genre, index) => (
                  <Pressable
                    key={index}
                    onPress={() =>
                      navigation.navigate("SongListScreen", {
                        genre: genre.name,
                        songs: genre.songs,
                      })
                    }
                  >
                    <GenreContainer image={genre.photo} />
                  </Pressable>
                ))
              }
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.headerStyle}>Browse More</Text>
            <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
              {
                // GenreBox
                data[1].browse.map((genre, index) => (
                  <Pressable
                    key={index}
                    onPress={() =>
                      navigation.navigate("SongListScreen", {
                        genre: genre.name,
                        songs: genre.songs,
                      })
                    }
                  >
                    <GenreContainer image={genre.photo} />
                  </Pressable>
                ))
              }
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? 35 : 0,
  },
  section: {
    flex: 1,
    marginTop: 20,
  },
  headerStyle: {
    fontSize: 25,
    color: "white",
    marginLeft: 10,
    marginVertical: 10,
  },
  subSection: {
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});
