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

const VibesContainer = ({ image, text }) => {
  return (
    <View style={{ marginHorizontal: 0 }}>
      <Image
        source={image}
        style={{
          borderRadius: 10,
          width: responsiveWidth(45),
          height: responsiveHeight(15),
        }}
      />

      <Text
        style={{
          fontSize: 18,
          marginTop: 5,
          color: "green",
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default VibesContainer;
