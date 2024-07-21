import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const responsiveWidth = (percentage) => {
  const screenWidth = Dimensions.get("window").width;
  return (percentage * screenWidth) / 100;
};

const responsiveHeight = (percentage) => {
  const screenHeight = Dimensions.get("window").height;
  return (percentage * screenHeight) / 100;
};

const VibesContainer = ({ image, text }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ image }} style={styles.image} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
  },
  text: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default VibesContainer;
