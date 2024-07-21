import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";

const SongListScreen = ({ route }) => {
  const { genre, songs } = route.params;
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() =>
        navigation.navigate("PlayerScreen", {
          artist: item.artist,
          title: item.title,
          albumArt: item.albumArt,
          link: item.link,
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
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  genreTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    color: "white",
  },
  songContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingBottom: 10,
  },
  albumArt: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 10,
  },
  songDetails: {
    flex: 1,
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
