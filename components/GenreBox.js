import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";

const placeholderImage = require("../assets/adaptive-icon.png");

const GenreBox = ({ name, image = placeholderImage, color = "red" }) => {
  const navigator = useNavigation();

  return (
    <Pressable onPress={() => navigator.navigate("PlayerScreen")}>
      <View
        style={{
          backgroundColor: color,
          width: 150,
          height: 150,
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

export default GenreBox;
