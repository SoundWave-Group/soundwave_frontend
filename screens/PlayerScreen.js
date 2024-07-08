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
import { useState, useEffect } from "react";

const PlayerScreen = () => {
  const navigator = useNavigation();

  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(225);

  const [isShuffle, setIsShuffle] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentPosition((prev) => {
          if (prev < duration) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 1000);
    } else if (!isPlaying && currentPosition !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentPosition, duration]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60).toFixed(0);
    const secs = (seconds % 60).toFixed(0);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 20, justifyContent: "flex-start" }}>
        <Pressable
          onPress={() => {
            navigator.goBack();
          }}
        >
          <Ionicons name="chevron-down" size={24} color="black" />
        </Pressable>
      </View>
      <View>
        <Image
          source={require("../assets/singer4.jpg")}
          style={{
            width: 330,
            height: 330,
            marginHorizontal: "auto",
            marginTop: 20,
            borderRadius: 10,
          }}
        />
      </View>

      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          }}
        >
          <View style={styles.containerSecondary}>
            <Text
              style={{
                fontSize: 22,
                textAlign: "center",
                marginTop: 80,
                fontWeight: "bold",
              }}
            >
              We Can't Be Friends
            </Text>
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                marginTop: 5,
              }}
            >
              Ariana Grande
            </Text>
            <Slider
              value={currentPosition}
              onValueChange={(value) => setCurrentPosition(value)}
              minimumValue={0}
              maximumValue={duration}
              thumbTintColor="lightblue"
              trackStyle={{ backgroundColor: "lightblue" }}
              style={{ width: 300, alignSelf: "center" }}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
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
              <Ionicons name="play-back" size={36} color="black" />
              <Pressable onPress={togglePlayPause}>
                <Ionicons
                  name={isPlaying ? "pause" : "play"}
                  size={36}
                  color="black"
                />
              </Pressable>
              <Ionicons name="play-forward" size={36} color="black" />
              <Pressable onPress={toggleRepeat}>
                <Ionicons
                  name={"repeat"}
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    width: 300,
  },
});

export default PlayerScreen;
