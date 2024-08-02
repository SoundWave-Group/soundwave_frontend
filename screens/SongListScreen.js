import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";

const SongListScreen = ({ route }) => {
  const { genre, songs } = route.params;
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <Pressable
      onPress={() =>
        navigation.navigate("PlayerScreen", {
          songs: songs,
          currentIndex: index,
          genre: genre,
        })
      }
    >
      <View style={styles.songContainer}>
        <Image source={{ uri: item.albumArt }} style={styles.albumArt} />
        <View style={styles.songDetails}>
          <Text style={styles.songTitle}>{item.title}</Text>
          <Text style={styles.artistName}>{item.artist}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginBottom: 10,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text style={[styles.genreTitle, { marginBottom: 30 }]}>{genre}</Text>
      </View>

      <FlatList
        data={songs}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? 35 : 0,
  },

  container: {
    flex: 1,
    backgroundColor: "black",
  },
  genreTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    color: "white",
  },
  songContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#101010",
    padding: 10,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  albumArt: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 10,
  },
  songDetails: {
    flex: 1,
    marginLeft: 10,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  artistName: {
    fontSize: 16,
    color: "gray",
  },
});

export default SongListScreen;
