import { StyleSheet, Text, View, Pressable, Image } from "react-native";

const VideoComponent = () => {
  return (
    <Pressable onPress={() => console.log("Video Pressed")}>
      <View style={{ marginVertical: 10 }}>
        <Image
          source={require("../assets/mixes/Upbeat.png")}
          style={{ width: 350, height: 200, borderRadius: 10 }}
        />
        <Text style={{ fontSize: 18, marginTop: 5 }}>Video 1</Text>
      </View>
    </Pressable>
  );
};

export default VideoComponent;

const styles = StyleSheet.create({});
