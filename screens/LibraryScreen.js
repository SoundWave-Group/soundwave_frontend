import React from "react";
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import LibrarySections from "../components/LibrarySections";

const LibraryScreen = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <Text style={{ fontSize: 25, margin: 10 }}>Your Library</Text>

        <View style={{ marginVertical: 50 }}>
          <LibrarySections name="Liked Tracks" link="LikedTracks" />
          <LibrarySections name="Playlists" link="Playlists" />
          <LibrarySections name="Albums" link="Albums" />
          <LibrarySections name="Following" link="Following" />
          <LibrarySections name="Stream" link="Stream" />
          <LibrarySections name="Your Uploads" link="Uploads" />
        </View>
      </SafeAreaView>

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
