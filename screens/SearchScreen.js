import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import data from "../utils/data";
import GenreContainer from "../components/GenreContainer";
import VibesContainer from "../components/VibesContainer";

const SearchScreen = () => {
  const navigation = useNavigation();

  const [searchItem, setSearchItem] = useState("");
  const [search, setSearch] = useState(false);

  const handleSearch = (text) => {
    setSearchItem(text);
    setSearch(text.length > 0);
  };

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
        onChangeText={handleSearch}
        value={searchItem}
        placeholder="Songs, Artist & More"
      />

      <Text style={{ fontSize: 25, margin: 10 }}>Vibes</Text>

      {search ? (
        <ScrollView>
          <View style={styles.gridContainer}>
            {data[6].vibes
              .filter((vibes) =>
                vibes.name.toLowerCase().includes(searchItem.toLowerCase())
              )
              .map((vibes, index) => (
                <Pressable
                  key={index}
                  onPress={() =>
                    navigation.navigate("SongListScreen", {
                      genre: vibes.name,
                      songs: vibes.songs,
                    })
                  }
                  style={styles.genrePressable}
                >
                  <VibesContainer image={vibes.photo} text={vibes.name} />
                </Pressable>
              ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView>
          <View style={styles.gridContainer}>
            {data[6].vibes.map((vibes, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  navigation.navigate("SongListScreen", {
                    genre: vibes.name,
                    songs: vibes.songs,
                  })
                }
                style={styles.genrePressable}
              >
                <VibesContainer image={vibes.photo} text={vibes.name} />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginHorizontal: 5,
    marginTop: 10,
  },
  genrePressable: {
    width: "48%",
    aspectRatio: 1,
    marginBottom: 10,
  },
});

export default SearchScreen;
