import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import VideoComponent from "../components/VideoComponent";
import { ScrollView } from "react-native-gesture-handler";
import { Video, Audio } from "expo-av";

const responsiveWidth = (percentage) => {
  const screenWidth = Dimensions.get("window").width;
  return (percentage * screenWidth) / 100;
};

const responsiveHeight = (percentage) => {
  const screenHeight = Dimensions.get("window").height;
  return (percentage * screenHeight) / 100;
};

const VideoScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 25,
          color: "#OC5745",
          fontWeight: "600",
        }}
      >
        Videos
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <VideoComponent
          source={require("../assets/video.mp4")}
          title={"Video"}
        />
        <VideoComponent
          source={require("../assets/video.mp4")}
          title={"Videos"}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
