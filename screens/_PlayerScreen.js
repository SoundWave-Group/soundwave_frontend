import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Slider } from "@miblanchard/react-native-slider";
import { Audio } from "expo-av";

const LoadingModal = ({ visible }) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.modalBackground}>
        <ActivityIndicator size="large" color="lightgreen" />
      </View>
    </Modal>
  );
};

export default function PlayerScreen() {
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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongData = async () => {
      try {
        const response = await fetch(
          "https://soundwave-56af.onrender.com/api/tracks"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch song data");
        }
        const data = await response.json();
        setSongData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSongData();
  }, []);

  useEffect(() => {
    const loadAudio = async () => {
      if (songData.length === 0) return; // Ensure songData is loaded before attempting to load audio
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: songData[songIndex].link },
          { shouldPlay: false }
        );
        setSound(newSound);
        const status = await newSound.getStatusAsync();
        setDuration(status.durationMillis / 1000); // Convert milliseconds to seconds
      } catch (err) {
        setError("Failed to load audio");
      }
    };

    loadAudio();
  }, [songData, songIndex]);

  useEffect(() => {
    let interval = null;

    const updatePosition = async () => {
      try {
        if (sound && isPlaying) {
          const status = await sound.getStatusAsync();
          setCurrentPosition(status.positionMillis / 1000);
        }
      } catch (err) {
        setError("Failed to update position");
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
      try {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
      } catch (err) {
        setError("Failed to toggle play/pause");
      }
    }
  };

  const handleNext = async () => {
    try {
      const nextIndex = (songIndex + 1) % songData.length;
      setSongIndex(nextIndex);
      if (sound) {
        await sound.unloadAsync();
      }
      setIsPlaying(false); // Stop playback before loading new audio
    } catch (err) {
      setError("Failed to load next song");
    }
  };

  const handlePrevious = async () => {
    try {
      const prevIndex = (songIndex - 1 + songData.length) % songData.length;
      setSongIndex(prevIndex);
      if (sound) {
        await sound.unloadAsync();
      }
      setIsPlaying(false); // Stop playback before loading new audio
    } catch (err) {
      setError("Failed to load previous song");
    }
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
    return <LoadingModal visible={loading} />;
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
              onSlidingComplete={
                // play next song
                async (value) => {
                  if (value === duration) {
                    if (isRepeat) {
                      await sound.setPositionAsync(0);
                    } else {
                      handleNext();
                    }
                  }
                }
              }
              width={300}
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
}

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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(50, 153, 168)",
  },
});

export function MiniPlayer() {
  const navigation = useNavigation();

  const [liked, setLiked] = useState(false);
  const [playing, setPlaying] = useState(false);

  const toggleLiked = () => {
    setLiked(!liked);
  };

  const togglePlayPause = () => {
    setPlaying(!playing);
  };

  return (
    <Pressable onPress={() => navigation.navigate("PlayerScreen")}>
      <View style={miniPlayerStyles.container}>
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={togglePlayPause}>
            <Ionicons
              name={playing ? "play-circle-outline" : "pause-circle-outline"}
              size={30}
              color="black"
            />
          </Pressable>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: 600 }}>We Can't Be Friends</Text>
            <Text>Ariana Grande</Text>
          </View>
        </View>
        <Pressable onPress={toggleLiked}>
          <Ionicons name={liked ? "heart-outline" : "heart"} size={30} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const miniPlayerStyles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 5,
    width: "95%",
    left: 10,
    right: 10,
    backgroundColor: "rgb(50, 153, 168)",
    borderRadius: 30,
    marginHorizontal: "auto",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
