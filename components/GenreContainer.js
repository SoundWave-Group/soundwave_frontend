import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";
import { Dimensions } from "react-native";

const placeholderImage = require("../assets/adaptive-icon.png");

const responsiveWidth = (percentage) => {
  const screenWidth = Dimensions.get("window").width;
  return (percentage * screenWidth) / 100;
};

const responsiveHeight = (percentage) => {
  const screenHeight = Dimensions.get("window").height;
  return (percentage * screenHeight) / 100;
};

const GenreContainer = ({ name, image = placeholderImage, color = "red" }) => {
  const navigator = useNavigation();
  return (
    <Pressable onPress={() => navigator.navigate("PlayerScreen")}>
      <View
        style={{
          backgroundColor: color,
          width: responsiveWidth(45),
          height: responsiveHeight(20),
          marginHorizontal: 5,
          marginVertical: 5,
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 20, padding: 10 }}>{name}</Text>
      </View>
    </Pressable>
  );
};

export default GenreContainer;
