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

const GenreContainer = ({ image, text }) => {
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
          marginVertical: -2,
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

export default GenreContainer;
