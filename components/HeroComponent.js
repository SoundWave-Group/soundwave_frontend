import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";

const responsiveWidth = (percentage) => {
  const screenWidth = Dimensions.get("window").width;
  return (percentage * screenWidth) / 100;
};

const responsiveHeight = (percentage) => {
  const screenHeight = Dimensions.get("window").height;
  return (percentage * screenHeight) / 100;
};

const HeroComponent = ({ image, text }) => {
  const navigator = useNavigation();
  return (
    <View
      style={{
        width: responsiveWidth(45),
        heigh: responsiveHeight(45),
      }}
    >
      <Image
        source={image}
        style={{
          borderRadius: 10,
          borderColor: "green",
          borderWidth: 1,
          width: responsiveWidth(90),
          height: responsiveHeight(45),
        }}
      />

      <Text
        style={{
          fontSize: 18,
          marginTop: 5,
          color: "white",
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default HeroComponent;
