import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";

import HomeNavigation from "../../components/HomeNavigation";
import { useNavigation } from "@react-navigation/native";
import GenreBox from "../../components/GenreBox";
import GenreContainer from "../../components/GenreContainer";
import { Ionicons } from "@expo/vector-icons";

const trending = require.context("../../assets/trending", true);
const trendingList = trending.keys().map(trending);

const trendingText = [
  // afropop, r&b, gospel, rock, jazz, country, pop, reggae, soul, folk
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

export default function App() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
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
            {trendingList.map((image, index) => {
              return (
                <GenreContainer
                  key={index}
                  image={image}
                  text={trendingText[index]}
                />
              );
            })}
          </View>
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
    paddingLeft: 10,
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
