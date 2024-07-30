import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  SafeAreaView,
  Platform,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getCachedSongs } from "../../utils/cacheAudio";

const Downloads = () => {
  const navigation = useNavigation();
  const [cachedSongs, setCachedSongs] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchCachedSongs();
    }, [])
  );

  const fetchCachedSongs = async () => {
    try {
      const songs = await getCachedSongs();
      setCachedSongs(songs);
    } catch (error) {
      console.error("Error fetching cached songs:", error);
    }
  };

  const renderSongItem = ({ item }) => (
    <Pressable
      style={styles.songItem}
      onPress={() => navigation.navigate("Player", { ...item })}
    >
      <Image source={{ uri: item.albumArt }} style={styles.albumArt} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={25} color="white" />
        </Pressable>
        <Text style={styles.headerTitle}>Downloads</Text>
      </View>
      {cachedSongs.length > 0 ? (
        <FlatList
          data={cachedSongs}
          renderItem={renderSongItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.songList}
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateTitle}>No Downloads Yet</Text>
          <Text style={styles.emptyStateDescription}>
            Songs you have downloaded will appear here.
          </Text>
          <Pressable
            style={styles.searchButton}
            onPress={() => navigation.navigate("SearchTab")}
          >
            <Text style={styles.searchButtonText}>Search for Songs</Text>
          </Pressable>
        </View>
      )}
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Downloads;

// Add your styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  songList: {
    paddingHorizontal: 16,
  },
  songItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  songTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  songArtist: {
    color: "#999",
    fontSize: 14,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  emptyStateTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptyStateDescription: {
    color: "#999",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
  searchButton: {
    backgroundColor: "#1DB954",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  albumArt: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 12,
  },
  songInfo: {
    flex: 1,
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
});
