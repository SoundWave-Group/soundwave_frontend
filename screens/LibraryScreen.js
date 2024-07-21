import React from "react";
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import LibrarySections from "../components/LibrarySections";
import MiniPlayer from "../components/MiniPlayer";

const LibraryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.content}>
        <Text
          style={{
            fontSize: 25,
            marginLeft: 20,
            color: "white",
            fontWeight: "600",
          }}
        >
          Your Library
        </Text>

        <View
          style={{
            marginVertical: 50,
            marginHorizontal: 20,
            justifyContent: "center",
          }}
        >
          <LibrarySections
            name="Liked Tracks"
            link="LikedTracks"
            icon={"heart"}
          />
          <LibrarySections
            name="Playlists"
            link="Playlists"
            icon={"folder-plus"}
          />
          <LibrarySections name="Albums" link="Albums" icon={"folder-plus"} />
          <LibrarySections name="Following" link="Following" icon={"plus"} />
          <LibrarySections name="Stream" link="Stream" icon={"broadcast"} />
          <LibrarySections name="Your Uploads" link="Uploads" icon={"upload"} />
        </View>
      </SafeAreaView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  content: {
    flex: 1,
  },
});

export default LibraryScreen;
