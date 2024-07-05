import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, Pressable } from "react-native";

const GenreBox = ({ image, text }) => {
  const navigator = useNavigation();

  return (
    <Pressable onPress={() => navigator.navigate("PlayerScreen")}>
      <View
        style={{
          width: 150,
          height: 150,
          marginHorizontal: 5,
          marginVertical: 5,
          borderRadius: 10,
        }}
      >
        <Image source={image} style={{ borderRadius: 10 }} />
      </View>
    </Pressable>
  );
};

export default GenreBox;
