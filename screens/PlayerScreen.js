import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  Image,
  Pressable,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Slider } from "@miblanchard/react-native-slider";
import { Audio } from "expo-av";
import { StatusBar } from "expo-status-bar";

export default function PlayerScreen({ route }) {
  const { artist, title, albumArt, link } = route.params;

  const navigation = useNavigation();
  const [sound, setSound] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const loadSound = useCallback(async () => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }

    const { sound: newSound, status } = await Audio.Sound.createAsync(
      { uri: link },
      { shouldPlay: true },
      onPlaybackStatusUpdate
    );

    setSound(newSound);
    setDuration(status.durationMillis);
    setIsPlaying(status.isPlaying);
  }, [link]);

  useEffect(() => {
    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [loadSound]);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setCurrentPosition(status.positionMillis);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  const handlePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    }
  };

  const handleForward = async () => {
    if (sound) {
      let newPosition = currentPosition + 10000; // forward by 10 seconds
      if (newPosition > duration) newPosition = duration;
      await sound.setPositionAsync(newPosition);
    }
  };

  const handleBackward = async () => {
    if (sound) {
      let newPosition = currentPosition - 10000; // backward by 10 seconds
      if (newPosition < 0) newPosition = 0;
      await sound.setPositionAsync(newPosition);
    }
  };

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
      <View style={{ margin: 20, justifyContent: "flex-start" }}>
        <Pressable
          onPress={() => {
            sound.unloadAsync();
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
              value={currentPosition}
              minimumValue={0}
              maximumValue={duration}
              thumbTintColor="lightblue"
              trackStyle={{ backgroundColor: "lightblue" }}
              width={300}
              onValueChange={async (value) => {
                if (sound) {
                  await sound.setPositionAsync(value[0]);
                }
              }}
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
});
