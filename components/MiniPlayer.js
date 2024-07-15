import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const MiniPlayer = () => {
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
    <Pressable
      onPress={() =>
        navigation.navigate("PlayerScreen", {
          artist: item.artist,
          title: item.title,
          albumArt: item.albumArt,
          link: item.link,
        })
      }
    >
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={togglePlayPause}>
            <Ionicons
              name={playing ? "play-circle-outline" : "pause-circle-outline"}
              size={30}
              color="black"
            />
          </Pressable>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: 600 }}>R & Drill</Text>
            <Text>B Young</Text>
          </View>
        </View>
        <Pressable onPress={toggleLiked}>
          <Ionicons name={liked ? "heart-outline" : "heart"} size={30} />
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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

export default MiniPlayer;
