import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import GenreBox from "../components/GenreBox";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData = await AsyncStorage.getItem("userDetails");

        if (userData) {
          setUserDetails(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Failed to load user details", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HomeNavigation activeRouteName="MainScreen" />
      <ScrollView>
        <View>
          <Text style={[styles.headerStyle]}>Featured</Text>
          <View style={{ margin: 20 }}>
            <HeroComponent
              image={require("../assets/singer3.jpg")}
              text={"hot songs right now!"}
            />
          </View>
        </View>
        <View>
          <Text style={[styles.headerStyle, { marginBottom: 10 }]}>
            Made For {userDetails.userProfile.fullName.split(" ")[0]}
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
    backgroundColor: "black",
  },
});
