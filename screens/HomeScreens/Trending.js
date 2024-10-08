import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  SafeAreaView,
  Pressable,
} from "react-native";

import HomeNavigation from "../../components/HomeNavigation";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const trending = require.context("../../assets/trending", true);
const trendingList = trending.keys().map(trending);

const trendingText = [
  "Afropop",
  "Country",
  "Folk",
  "Gospel",
  "Jazz",
  "Pop",
  "R&B",
  "Reggae",
  "Rock",
  "Soul",
];

import data from "../../utils/data";
import GenreBox from "../../components/GenreBox";
import GenreContainer from "../../components/GenreContainer";

export default function App() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
      <HomeNavigation activeRouteName="Trending" />
      <ScrollView>
        <View style={styles.genre}>
          <Text style={{ fontSize: 25, color: "green", marginLeft: 5 }}>
            Trending Music{" "}
            <Ionicons name="trending-up-outline" size={24} color="green" />
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: 20,
              rowGap: 10,
            }}
          >
            {data[5].trending.map((trending, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  navigation.navigate("SongListScreen", {
                    genre: trending.name,
                    songs: trending.songs,
                  })
                }
                style={styles.genreContainer}
              >
                <GenreContainer text={trending.name} image={trending.photo} />
              </Pressable>
            ))}
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
    backgroundColor: "black",
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
