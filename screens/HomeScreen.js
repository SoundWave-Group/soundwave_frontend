import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import data from "../utils/data";
import GenreContainer from "../components/GenreContainer";
import HomeNavigation from "../components/HomeNavigation";
import HeroComponent from "../components/HeroComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GenreBox from "../components/GenreBox";

export default function HomeScreen() {
  const navigation = useNavigation();

  const fetchHeroData = () => {
    // select a random genre and show
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[2].genre[randomIndex];
  };

  return (
    <SafeAreaView style={styles.container}>
      <HomeNavigation activeRouteName="MainScreen" />
      <ScrollView>
        <View>
          <Text style={[styles.headerStyle]}>Featured</Text>
          <View style={{ margin: 20 }}>
            {
              // <TouchableOpacity
              //   onPress={() =>
              //     navigation.navigate("SongListScreen", {
              //       genre: fetchHeroData().name,
              //       songs: fetchHeroData().songs,
              //     })
              //   }
              // >
              <HeroComponent
                image={require("../assets/singer3.jpg")}
                text={"hello world"}
              />
              // </TouchableOpacity>
            }
          </View>
        </View>
        <View>
          <Text style={[styles.headerStyle, { marginBottom: 10 }]}>
            Made For You
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
                    genre: mix.name,
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
      <StatusBar style="light" />
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
    backgroundColor: "black",
  },
});
