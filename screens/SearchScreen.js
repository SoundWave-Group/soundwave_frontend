import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import GenreContainer from "../components/GenreContainer";

import data from "../utils/data";

const SearchScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("Download");
          }}
        >
          <Ionicons name="cloud-download" size={24} color="black" />
        </Pressable>
      </View>
      <TextInput
        style={{
          width: "95%",
          borderWidth: 0.5,
          marginHorizontal: "auto",
          paddingHorizontal: 10,
          margin: 10,
          height: 40,
          borderRadius: 10,
          borderColor: "green",
        }}
        placeholder="Songs, Artist & More"
      />
      <Text style={{ fontSize: 25, margin: 10 }}>Vibes</Text>
      <ScrollView>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              marginLeft: 5,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
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
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default SearchScreen;
