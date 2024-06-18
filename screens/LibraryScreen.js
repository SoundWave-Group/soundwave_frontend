import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import LibrarySections from "../components/LibrarySections";

const LibraryScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ fontSize: 20, margin: 10, marginTop: 60 }}>
          Your Library
        </Text>

        <View style={{ marginVertical: 50 }}>
          <LibrarySections name="Liked Tracks" link="LikedTracks" />
          <LibrarySections name="Playlists" link="Playlists" />
          <LibrarySections name="Albums" link="Albums" />
          <LibrarySections name="Following" link="Following" />
          <LibrarySections name="Stream" link="Stream" />
          <LibrarySections name="Your Uploads" link="Uploads" />
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
  },
});

export default LibraryScreen;
