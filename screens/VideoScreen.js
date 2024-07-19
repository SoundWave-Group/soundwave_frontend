import React, { useRef, useState, useEffect } from "react";
import { View, Dimensions, FlatList, StyleSheet } from "react-native";
import { Video } from "expo-av";
import { useIsFocused } from "@react-navigation/native";
import { current } from "@reduxjs/toolkit";

const { height } = Dimensions.get("window");

const videos = [
  { id: "1", uri: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: "2", uri: "https://www.w3schools.com/html/movie.mp4" },
  { id: "3", uri: "https://www.w3schools.com/html/mov_bbb.mp4" },
  // Add more video URIs as needed
];

const VideoScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (videoRef.current) {
      if (isFocused) {
        videoRef.current.playAsync();
      } else {
        videoRef.current.pauseAsync();
      }
    }
  }, [isFocused]);

  const renderItem = ({ item, index }) => (
    <View style={styles.videoContainer}>
      <Video
        ref={(ref) => {
          if (index === currentIndex) videoRef.current = ref;
        }}
        source={{ uri: item.uri }}
        style={styles.video}
        resizeMode="cover"
        isLooping
        shouldPlay={currentIndex === index}
      />
    </View>
  );

  return (
    <View>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.y / height);
          if (index !== currentIndex) {
            setCurrentIndex(index);
          }
        }}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast" // Adjusting scrolling speed for smoother snap
        snapToInterval={height} // Snap to each item
        snapToAlignment="start" // Align to the start of the item
      />
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});

export default VideoScreen;
