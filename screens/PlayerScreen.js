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
  Modal,
  ScrollView,
  Animated,
  PanResponder,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Slider } from "@miblanchard/react-native-slider";
import { Audio } from "expo-av";
import { StatusBar } from "expo-status-bar";

import { getAudioUri, cacheAudio } from "../utils/cacheAudio";

export default function PlayerScreen({ route }) {
  const { songs, currentIndex, genre } = route.params;
  const [currentSongIndex, setCurrentSongIndex] = useState(currentIndex);
  const currentSong = songs[currentSongIndex];

  const navigation = useNavigation();
  const [sound, setSound] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [showLyricsModal, setShowLyricsModal] = useState(false);
  const [lyrics, setLyrics] = useState("");
  const [isFetchingLyrics, setIsFetchingLyrics] = useState(false);

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          setShowLyricsModal(false);
        }
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const loadSound = useCallback(
    async (link) => {
      setIsLoading(true);
      setError(null);

      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      try {
        let audioUri = await getAudioUri(link);
        if (!audioUri) {
          audioUri = link; // Use the original link if not cached
          cacheAudio(
            link,
            `song_${currentSongIndex}.mp3`,
            currentSong.title,
            currentSong.artist,
            currentSong.albumArt
          );
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
    },
    [currentSongIndex, currentSong]
  );

  useEffect(() => {
    loadSound(currentSong.link);

    return () => {
      if (sound) {
        sound.unloadAsync();
        setSound(null);
      }
    };
  }, [loadSound, currentSong]);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setCurrentPosition(status.positionMillis);
      setSliderValue(status.positionMillis);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);
      if (status.didJustFinish) {
        playNextSong();
      }
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

  const fetchLyrics = async () => {
    let artistN = currentSong.artist.split("&")[0];
    setIsFetchingLyrics(true);
    try {
      const response = await fetch(
        `https://api.lyrics.ovh/v1/${artistN}/${currentSong.title}`
      );
      const data = await response.json();
      setLyrics(data.lyrics || "Lyrics not found");
    } catch (error) {
      console.error("Error fetching lyrics:", error);
      setLyrics("Failed to fetch lyrics. Please try again.");
    } finally {
      setIsFetchingLyrics(false);
    }
  };

  const handleShowLyrics = () => {
    setShowLyricsModal(true);
    if (!lyrics) {
      fetchLyrics();
    }
  };

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const playNextSong = async () => {
    if (sound) {
      await sound.stopAsync();
      setSound(null);
    }
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0);
    }
  };

  const playPreviousSong = async () => {
    if (sound) {
      await sound.stopAsync();
      setSound(null);
    }
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else {
      setCurrentSongIndex(songs.length - 1);
    }
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
        <Pressable
          style={styles.retryButton}
          onPress={() => loadSound(currentSong.link)}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
        <Pressable
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
      <View style={styles.header}>
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
      <Image source={{ uri: currentSong.albumArt }} style={styles.albumArt} />
      <View style={styles.songDetails}>
        <View style={styles.containerSecondary}>
          <Text style={styles.songTitle}>{currentSong.title}</Text>
          <Text style={styles.songArtist}>{currentSong.artist}</Text>
          <Slider
            value={sliderValue}
            minimumValue={0}
            maximumValue={duration}
            thumbTintColor="lightblue"
            trackStyle={{ backgroundColor: "lightblue" }}
            style={styles.slider}
            width={300}
            onValueChange={(value) => setSliderValue(value[0])}
            onSlidingComplete={handleSeek}
          />
          <View style={styles.timeContainer}>
            <Text>{formatTime(currentPosition)}</Text>
            <Text>{formatTime(duration)}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable onPress={playPreviousSong}>
              <Ionicons name="play-skip-back" size={36} color="black" />
            </Pressable>
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
            <Pressable onPress={playNextSong}>
              <Ionicons name="play-skip-forward" size={36} color="black" />
            </Pressable>
          </View>
          <Pressable
            style={[styles.lyricsButton, { marginTop: 100 }]}
            onPress={handleShowLyrics}
          >
            <Text style={styles.lyricsButtonText}>Show Lyrics</Text>
          </Pressable>
        </View>
      </View>
      <Modal
        visible={showLyricsModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowLyricsModal(false)}
      >
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateY: pan.y }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderBar}></View>
          </View>
          <ScrollView contentContainerStyle={styles.lyricsContainer}>
            {isFetchingLyrics ? (
              <ActivityIndicator size="large" color="#000" />
            ) : (
              <Text style={styles.lyricsText}>{lyrics}</Text>
            )}
          </ScrollView>
        </Animated.View>
      </Modal>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 15 : 0,
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
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    marginTop: 20,
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
    marginTop: 20,
  },
  songTitle: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
  songArtist: {
    fontSize: 20,
    textAlign: "center",
    color: "black",
    marginBottom: 20,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
    marginVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "rgb(50, 153, 168)",
    fontSize: 16,
    fontWeight: "bold",
  },
  lyricsButton: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  lyricsButtonText: {
    color: "rgb(50, 153, 168)",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "70%",
    marginHorizontal: 10,
    marginTop: "auto",
  },
  modalHeader: {
    alignItems: "center",
    paddingVertical: 10,
    marginTop: -20,
    paddingBottom: 10,
  },
  modalHeaderBar: {
    width: 50,
    height: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "gray",
    borderRadius: 10,
  },
  lyricsContainer: {
    paddingBottom: 40,
  },
  lyricsText: {
    fontSize: 18,
    lineHeight: 24,
  },
});
