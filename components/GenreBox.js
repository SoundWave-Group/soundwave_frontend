import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, Pressable } from "react-native";

const GenreBox = ({ image, text }) => {
  const navigator = useNavigation();

  return (
    <View
      style={{
        width: 150,
        height: 150,
        marginHorizontal: 7,
        marginVertical: 5,
        borderRadius: 10,
      }}
    >
      <Image source={image} style={{ borderRadius: 10 }} />
    </View>
  );
};

export default GenreBox;
