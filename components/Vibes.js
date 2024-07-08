import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, Pressable } from "react-native";
import { Dimensions } from "react-native";

const responsiveWidth = (percentage) => {
  const screenWidth = Dimensions.get("window").width;
  return (percentage * screenWidth) / 100;
};

const responsiveHeight = (percentage) => {
  const screenHeight = Dimensions.get("window").height;
  return (percentage * screenHeight) / 100;
};

const Vibes = ({ name, image, height }) => {
  const navigator = useNavigation();
  return (
    <Pressable onPress={() => navigator.navigate("PlayerScreen")}>
      <View
        style={{
          width: responsiveWidth(45),
          height: responsiveHeight(height),
          marginVertical: 5,
          marginHorizontal: 5,
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
        }}
      >
        <Text>{name}</Text>
      </View>
    </Pressable>
  );
};

export default Vibes;
