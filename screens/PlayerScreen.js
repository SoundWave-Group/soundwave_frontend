import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Slider } from "@miblanchard/react-native-slider";
import { Audio } from "expo-av";

const PlayerScreen = () => {
  const navigation = useNavigation();
  const [sound, setSound] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongData = async () => {
      const response = await fetch(
        "https://soundcloud-clone-api.vercel.app/tracks"
      );
      const data = await response.json();
      setSongData(data.tracks);
      setLoading(false);
    };

    fetchSongData();
  }, []);

  useEffect(() => {
    const loadAudio = async () => {
      if (songData.length === 0) return; // Ensure songData is loaded before attempting to load audio
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: songData[songIndex].link },
        { shouldPlay: false }
      );
      setSound(newSound);
      const status = await newSound.getStatusAsync();
      setDuration(status.durationMillis / 1000); // Convert milliseconds to seconds
    };

    loadAudio();
  }, [songData, songIndex]);

  useEffect(() => {
    let interval = null;

    const updatePosition = async () => {
      if (sound && isPlaying) {
        const status = await sound.getStatusAsync();
        setCurrentPosition(status.positionMillis / 1000);
      }
    };

    if (isPlaying) {
      interval = setInterval(updatePosition, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, sound]);

  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = async () => {
    const nextIndex = (songIndex + 1) % songData.length;
    setSongIndex(nextIndex);
    if (sound) {
      await sound.unloadAsync();
    }
    setIsPlaying(false); // Stop playback before loading new audio
  };

  const handlePrevious = async () => {
    const prevIndex = (songIndex - 1 + songData.length) % songData.length;
    setSongIndex(prevIndex);
    if (sound) {
      await sound.unloadAsync();
    }
    setIsPlaying(false); // Stop playback before loading new audio
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
    if (!isShuffle) {
      const shuffledData = [...songData].sort(() => Math.random() - 0.5);
      setSongData(shuffledData);
      setSongIndex(0);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60).toFixed(0);
    const secs = (seconds % 60).toFixed(0);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 20, justifyContent: "flex-start" }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-down" size={24} color="black" />
        </Pressable>
      </View>
      <View>
        <Image
          source={{ uri: songData[songIndex].albumArt }}
          style={styles.albumArt}
        />
      </View>
      <View>
        <View style={styles.songDetails}>
          <View style={styles.containerSecondary}>
            <Text style={styles.songTitle}>{songData[songIndex].title}</Text>
            <Text style={styles.songArtist}>{songData[songIndex].artist}</Text>
            <Slider
              value={currentPosition}
              onValueChange={async (value) => {
                setCurrentPosition(value);
                if (sound) {
                  await sound.setPositionAsync(value * 1000); // Convert seconds to milliseconds
                }
              }}
              minimumValue={0}
              maximumValue={duration}
              thumbTintColor="lightblue"
              trackStyle={{ backgroundColor: "lightblue" }}
              style={{
                alignSelf: "center",
                backgroundColor: "red",
              }}
            />
            <View style={styles.timeContainer}>
              <Text>{formatTime(currentPosition)}</Text>
              <Text>{formatTime(duration)}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Pressable onPress={toggleShuffle}>
                <Ionicons
                  name="shuffle"
                  size={36}
                  color={isShuffle ? "white" : "black"}
                />
              </Pressable>
              <Pressable onPress={handlePrevious}>
                <Ionicons name="play-back" size={36} color="black" />
              </Pressable>
              <Pressable onPress={togglePlayPause}>
                <Ionicons
                  name={isPlaying ? "pause" : "play"}
                  size={36}
                  color="black"
                />
              </Pressable>
              <Pressable onPress={handleNext}>
                <Ionicons name="play-forward" size={36} color="black" />
              </Pressable>
              <Pressable onPress={() => setIsRepeat(!isRepeat)}>
                <Ionicons
                  name="repeat"
                  size={36}
                  color={isRepeat ? "white" : "black"}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(50, 153, 168)",
    alignItems: "center",
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
    fontSize: 22,
    textAlign: "center",
    marginTop: 80,
    fontWeight: "bold",
  },
  songArtist: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 5,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
});

export default PlayerScreen;
