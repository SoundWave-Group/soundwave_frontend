import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  Image,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Slider } from "@miblanchard/react-native-slider";
import { Audio } from "expo-av";
import { StatusBar } from "expo-status-bar";

import { getAudioUri, cacheAudio } from "../utils/cacheAudio";

export default function PlayerScreen({ route }) {
  const { artist, title, albumArt, link } = route.params;

  const navigation = useNavigation();
  const [sound, setSound] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [isCached, setIsCached] = useState(false);

  const loadSound = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }

    try {
      let audioUri = await getAudioUri(link);
      if (!audioUri) {
        setIsCached(false);
        audioUri = link; // Use the original link if not cached
      } else {
        setIsCached(true);
      }

      const { sound: newSound, status } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);
    } catch (err) {
      console.error("Error loading sound:", err);
      setError("Failed to load audio. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [link]);

  useEffect(() => {
    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
        setSound(null);
      }
    };
  }, [loadSound]);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setCurrentPosition(status.positionMillis);
      setSliderValue(status.positionMillis);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);
    } else if (status.error) {
      console.error(`Playback error: ${status.error}`);
      setError(`Playback error: ${status.error}`);
      handlePlaybackError();
    }
  };

  const handlePlaybackError = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
        setIsPlaying(false);
      } catch (err) {
        console.error("Error stopping playback:", err);
      }
    }
  };

  const handlePlayPause = async () => {
    if (sound) {
      try {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
      } catch (err) {
        console.error("Error toggling play/pause:", err);
        setError("Failed to play/pause. Please try again.");
        handlePlaybackError();
      }
    }
  };

  const handleForward = async () => {
    if (sound) {
      try {
        let newPosition = currentPosition + 10000; // forward by 10 seconds
        if (newPosition > duration) newPosition = duration;
        await sound.setPositionAsync(newPosition);
        setCurrentPosition(newPosition);
      } catch (err) {
        console.error("Error forwarding:", err);
        setError("Failed to forward. Please try again.");
        handlePlaybackError();
      }
    }
  };

  const handleBackward = async () => {
    if (sound) {
      try {
        let newPosition = currentPosition - 10000; // backward by 10 seconds
        if (newPosition < 0) newPosition = 0;
        await sound.setPositionAsync(newPosition);
        setCurrentPosition(newPosition);
      } catch (err) {
        console.error("Error rewinding:", err);
        setError("Failed to rewind. Please try again.");
        handlePlaybackError();
      }
    }
  };

  const handleSeek = async (value) => {
    if (sound) {
      try {
        await sound.setPositionAsync(value[0]);
        setCurrentPosition(value[0]);
      } catch (err) {
        console.error("Error seeking:", err);
        setError("Failed to seek. Please try again.");
        handlePlaybackError();
      }
    }
  };

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const filename = link.split("/").pop();
      await cacheAudio(link, filename, title, artist, albumArt);
      setIsCached(true);
      Alert.alert("Success", "Song downloaded successfully");
    } catch (err) {
      console.error("Error downloading:", err);
      Alert.alert("Error", "Failed to download the song. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.loadingContainer, styles.AndroidSafeArea]}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>loading audio</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={loadSound}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
      <View
        style={{
          margin: 20,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Pressable
          onPress={async () => {
            if (sound) {
              await sound.unloadAsync();
              setSound(null);
            }
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-down" size={24} color="black" />
        </Pressable>
      </View>
      <View>
        <Image source={{ uri: albumArt }} style={styles.albumArt} />
      </View>
      <View>
        <View style={styles.songDetails}>
          <View style={styles.containerSecondary}>
            <Text style={styles.songTitle}>{title}</Text>
            <Text style={styles.songArtist}>{artist}</Text>
            <Slider
              value={sliderValue}
              minimumValue={0}
              maximumValue={duration}
              thumbTintColor="lightblue"
              trackStyle={{ backgroundColor: "lightblue" }}
              width={300}
              onValueChange={(value) => setSliderValue(value[0])}
              onSlidingComplete={handleSeek}
            />
            <View style={styles.timeContainer}>
              <Text>{formatTime(currentPosition)}</Text>
              <Text>{formatTime(duration)}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Pressable onPress={handleBackward}>
                <MaterialIcons name="replay-10" size={36} color="black" />
              </Pressable>
              <Pressable onPress={handlePlayPause}>
                <Ionicons
                  name={isPlaying ? "pause" : "play"}
                  size={36}
                  color="black"
                />
              </Pressable>
              <Pressable onPress={handleForward}>
                <MaterialIcons name="forward-10" size={36} color="black" />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 40 }}>
          {!isCached ? (
            <Pressable onPress={handleDownload}>
              <Ionicons name="download-outline" size={34} color="black" />
            </Pressable>
          ) : (
            <Text style={styles.downloadedText}>Downloaded</Text>
          )}
        </View>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 35 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "rgb(50, 153, 168)",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(50, 153, 168)",
  },
  downloadedText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  albumArt: {
    width: 330,
    height: 330,
    marginHorizontal: "auto",
    marginTop: 20,
    borderRadius: 10,
  },
  songDetails: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  songTitle: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 80,
    fontWeight: "bold",
  },
  songArtist: {
    fontSize: 20,
    textAlign: "center",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    width: 300,
  },
  containerSecondary: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 18,
    marginTop: 20,
  },
  errorText: {
    color: "#ff0000",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "rgb(50, 153, 168)",
    fontSize: 16,
    fontWeight: "bold",
  },
});
