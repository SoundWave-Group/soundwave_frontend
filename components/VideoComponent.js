import { Video } from "expo-av";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";

const VideoComponent = ({ source, title }) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Video
        source={source}
        style={{ width: 350, height: 200, borderRadius: 10 }}
        useNativeControls
        resizeMode="contain"
      />
      <Text style={{ fontSize: 20, margin: 5 }}>{title}</Text>
    </View>
  );
};

export default VideoComponent;

const styles = StyleSheet.create({});
