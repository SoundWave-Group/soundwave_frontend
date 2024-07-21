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
  const navigator = useNavigation();
  return (
    <View
      style={{
        width: responsiveWidth(45),
        marginHorizontal: 5,
      }}
    >
      <Image
        source={image}
        style={{
          borderRadius: 10,
          width: responsiveWidth(46),
          height: responsiveHeight(20),
          borderRadius: 20,
          borderWidth: 10,
          borderColor: "black",
        }}
      />

      <Text
        style={{
          fontSize: 18,
          marginLeft: 10,
          color: "white",
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default VibesContainer;
