import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Video } from "expo-av";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

const videos = [
  {
    id: "1",
    uri: "https://raw.githubusercontent.com/thelocalgodd/storage/main/soundwave/videos/notlikeus3.mp4",
  },
  {
    id: "2",
    uri: "https://raw.githubusercontent.com/thelocalgodd/storage/main/soundwave/videos/jasonderulo.mp4",
  },
  {
    id: "3",
    uri: "https://raw.githubusercontent.com/thelocalgodd/storage/main/soundwave/videos/tshwala.mp4",
  },
  {
    id: "4",
    uri: "https://raw.githubusercontent.com/thelocalgodd/storage/main/soundwave/videos/calmdown.mp4",
  },
];

const VideoScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(new Array(videos.length).fill(true));
  const videoRefs = useRef([]);

  const pauseAllVideos = () => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pauseAsync();
      }
    });
  };

  const playCurrentVideo = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.playAsync();
    }
  };

  useFocusEffect(
    useCallback(() => {
      playCurrentVideo(currentIndex);
      return () => pauseAllVideos();
    }, [currentIndex])
  );

  useEffect(() => {
    return () => pauseAllVideos(); // Ensure all videos are paused on unmount
  }, []);

  const handleLoadStart = (index) => {
    const updatedLoading = [...loading];
    updatedLoading[index] = true;
    setLoading(updatedLoading);
  };

  const handleLoad = (index) => {
    const updatedLoading = [...loading];
    updatedLoading[index] = false;
    setLoading(updatedLoading);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.videoContainer}>
      {loading[index] && (
        <ActivityIndicator
          size="large"
          color="#ffffff"
          style={styles.loadingIndicator}
        />
      )}
      <Video
        ref={(ref) => (videoRefs.current[index] = ref)}
        source={{ uri: item.uri }}
        style={styles.video}
        resizeMode="cover"
        shouldPlay={currentIndex === index}
        isLooping
        onLoadStart={() => handleLoadStart(index)}
        onLoad={() => handleLoad(index)}
      />
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
      <Text style={styles.heading}>Videos</Text>
      <FlatList
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
            pauseAllVideos();
            setCurrentIndex(index);
            playCurrentVideo(index);
          }
        }}
        showsHorizontalScrollIndicator={false}
      />
      <Text
        style={{ color: "grey", marginTop: 20, marginBottom: 30, fontSize: 20 }}
      >
        swipe right to see more
      </Text>
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
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  videoContainer: {
    width: width * 0.8,
    marginHorizontal: width * 0.1,
    height: height * 0.7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default VideoScreen;
