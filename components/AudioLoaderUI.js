import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";

const AudioLoaderUI = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Slider
          minimumValue={0}
          maximumValue={10}
          thumbTintColor="green"
          trackStyle={{ backgroundColor: "lightgreen" }}
          disabled={true}
          width={300}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>0.00</Text>
          <Text>10.00</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Ionicons name="shuffle" size={36} color="black" />
          <Ionicons name="play-back" size={36} color="black" />
          <Ionicons name="pause" size={36} color="black" />
          <Ionicons name="play-forward" size={36} color="black" />
          <Ionicons name="repeat" size={36} color="black" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    width: 300,
  },
});

export default AudioLoaderUI;
