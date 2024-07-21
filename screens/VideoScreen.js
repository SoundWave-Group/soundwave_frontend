import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  AppState,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Video } from "expo-av";

const { width, height } = Dimensions.get("window");

const videos = [
  { id: "1", uri: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: "2", uri: "https://www.w3schools.com/html/movie.mp4" },
  { id: "3", uri: "https://www.w3schools.com/html/mov_bbb.mp4" },
];

const VideoScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  const appState = useRef(AppState.currentState);
  const flatListRef = useRef(null);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      // App has come to the foreground
    } else {
      // App has gone to the background or is inactive
      videoRef.current.pauseAsync();
    }
    appState.current = nextAppState;
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.videoContainer}>
      <Video
        ref={videoRef}
        source={{ uri: item.uri }}
        style={styles.video}
        resizeMode="cover"
        shouldPlay={currentIndex === index}
        isLooping
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Videos</Text>
      <FlatList
        ref={flatListRef}
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={width}
        decelerationRate="fast"
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / width);
          if (index !== currentIndex) {
            setCurrentIndex(index);
          }
        }}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={{ color: "white" }}>
        {currentIndex + 1} / {videos.length}
      </Text>
      <Text style={{ color: "white", marginTop: 20, fontSize: 20 }}>Swipe</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  videoContainer: {
    width: width * 0.8,
    margin: 10,
    marginHorizontal: 50,
    height: height * 0.7,
    borderColor: "lightgreen",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});

export default VideoScreen;
