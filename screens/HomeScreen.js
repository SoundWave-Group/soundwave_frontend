import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
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
import GenreBox from "../components/GenreBox";

export default function HomeScreen() {
  const navigation = useNavigation();

  const heroData = data[6].vibes[5];

  return (
    <SafeAreaView style={styles.container}>
      <HomeNavigation activeRouteName="MainScreen" />
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.headerStyle}>Featured</Text>
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
              <Text
                style={[
                  styles.text,
                  { marginTop: -10, fontSize: 18, fontWeight: 400 },
                ]}
              >
                {heroData.name}
              </Text>
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
                data[4].mixes.map((genre, index) => (
                  <GenreContainer key={index} image={genre.photo} />
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
  section: {
    flex: 1,
    marginTop: 20,
  },
  headerStyle: {
    fontSize: 25,
    color: "green",
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
