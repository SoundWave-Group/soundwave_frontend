import React from "react";
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
import MiniPlayer from "../components/MiniPlayer";

export default function HomeScreen() {
  const navigation = useNavigation();

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
            {data[2].genre.map((genre, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  navigation.navigate("SongListScreen", {
                    genre: genre.name,
                    songs: genre.songs,
                  })
                }
                style={styles.genreContainer}
              >
                <GenreContainer image={genre.photo} />
              </Pressable>
            ))}
          </View>
        </View>

        <Text style={[styles.headerStyle, { marginTop: 10, marginBottom: 10 }]}>
          Browse More
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginLeft: 5 }}>
          {data[1].browse.map((genre, index) => (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate("SongListScreen", {
                  genre: genre.name,
                  songs: genre.songs,
                })
              }
              style={styles.genreContainer}
            >
              <GenreContainer image={genre.photo} />
            </Pressable>
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
  },
});
