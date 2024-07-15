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

export default function PlayerScreen({ route }) {
  const { artist, title, albumArt, link } = route.params;

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 20, justifyContent: "flex-start" }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-down" size={24} color="black" />
        </Pressable>
      </View>
      <View>
        <Image source={albumArt} style={styles.albumArt} />
      </View>
      <View>
        <View style={styles.songDetails}>
          <View style={styles.containerSecondary}>
            <Text style={styles.songTitle}>{title}</Text>
            <Text style={styles.songArtist}>{artist}</Text>
            <Slider
              value={0}
              minimumValue={0}
              maximumValue={10}
              thumbTintColor="lightblue"
              trackStyle={{ backgroundColor: "lightblue" }}
              width={300}
            />
            <View style={styles.timeContainer}>
              <Text>0:00</Text>
              <Text>4:00</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Pressable>
                <Ionicons
                  name="shuffle"
                  size={36}
                  color={isShuffle ? "white" : "black"}
                />
              </Pressable>
              <Pressable>
                <Ionicons name="play-back" size={36} color="black" />
              </Pressable>
              <Pressable>
                <Ionicons
                  name={isPlaying ? "pause" : "play"}
                  size={36}
                  color="black"
                />
              </Pressable>
              <Pressable>
                <Ionicons name="play-forward" size={36} color="black" />
              </Pressable>
              <Pressable>
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
